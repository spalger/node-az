import { inspect, format } from 'util'

import Rx from 'rxjs/Rx'
import express from 'express'

import { server$ } from './server'
import { listen } from './listen'
import { handleWithExpress } from './handle_with_express'

const getPort$ = config$ => config$
  .map(config => config.port)
  .distinctUntilChanged()

let idCounter = 0
export function startApp(log$, config$) {
  const port$ = getPort$(config$)
  const reqRes$ = new Rx.Subject()

  const app = express()

  app.use((req, res) => {
    res.send('hi')
  })

  return Rx.Observable.merge(
    reqRes$
      .do((reqRes) => {
        reqRes.id = ++idCounter
        reqRes.start = Date.now()

        reqRes.log = (...msg) => {
          log$.next(`req ${reqRes.id}: ${format(...msg)}`)
        }

        // copy reqRes.log to request and response object
        reqRes.request.log = reqRes.log
        reqRes.response.log = reqRes.log

        reqRes.log('received request', reqRes.request.url)
      })
      .let(handleWithExpress(app))
      .do(({ log, start, response }) => {
        log(`%d response - send %d bytes in %d ms`, response.statusCode, response.outputSize, Date.now() - start)
      }),

    server$
      .let(listen(port$))
      .do(event => {
        switch (event.type) {
          case 'listening':
            log$.next(`server listening at http://localhost:${event.params.port}`)
            return

          case 'request':
            reqRes$.next(event.params)
            return

          default:
            throw new Error(`unexpected event ${inspect(event)}`)
        }
      })
  )
}
