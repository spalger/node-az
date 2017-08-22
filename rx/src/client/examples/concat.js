import Rx from 'rxjs/Rx'

export function makeConcatStream() {
  const a$ = Rx.Observable
    .timer(0, 200)
    .takeWhile(i => (i < 2))

  return Rx.Observable.concat(a$, a$)
}
