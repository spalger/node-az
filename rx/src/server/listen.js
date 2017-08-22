import Rx from 'rxjs/Rx'

export const listen = (port$) => (server$) => (
  port$
    .switchMap((port) => (
      server$.map(server => (
        [server, port]
      ))
    ))
    .switchMap(([server, port]) => (
      Rx.Observable
        .merge(
          // map "listening" events
          Rx.Observable
            .fromEvent(server, 'listening', null, () => ({
              type: 'listening',
              params: {
                port,
              },
            })),

          // map "request" events
          Rx.Observable
            .fromEvent(server, 'request', null, (request, response) => ({
              type: 'request',
              params: {
                request,
                response,
              },
            })),

          // throw "error" events into the stream
          Rx.Observable
            .fromEvent(server, 'error', null)
            .map(error => { throw error }),

          // once all listeners are setup call server.listen()
          Rx.Observable
            .defer(() => {
              server.listen(port)
            }),
        )
        .takeUntil(
          Rx.Observable.fromEvent(server, 'close')
        )
    ))
)
