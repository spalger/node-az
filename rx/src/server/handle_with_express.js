import Rx from 'rxjs/Rx'

export const handleWithExpress = (app) => (reqRes$) => (
  reqRes$
    .mergeMap(reqRes => {
      const { request, response } = reqRes

      return Rx.Observable
        .merge(
          // listen for "close" or "finish" event
          // before passing the request/response
          // to express, in case events are triggered
          // synchronously
          Rx.Observable
            .merge(
              Rx.Observable.fromEvent(response, 'close')
                .mapTo({ type: 'close' }),
              Rx.Observable.fromEvent(response, 'finish')
                .mapTo({ type: 'finish' })
            ),


          // pass request/response to express and
          // complete this stream without emitting
          Rx.Observable
            .defer(() => {
              app(request, response)
            }),
        )
        // the first value on the stream should be "close" or "finish" event
        .first()
        // map the event to the reqRes object we receives so that outsiders
        // can log stats and such
        .mapTo(reqRes)
    })
)
