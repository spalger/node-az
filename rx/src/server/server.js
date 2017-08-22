import http from 'http'

import stoppable from 'stoppable'
import Rx from 'rxjs/Rx'

export const server$ = new Rx.Observable(observer => {
  const httpServer = stoppable(http.createServer())
  observer.next(httpServer)
  return () => {
    httpServer.stop()
  }
})
