import Rx from 'rxjs/Rx'

export function makeTakeUntilStream() {
  const a$ = Rx.Observable
    .timer(0, 1000)
    .map(i => i * 1000)

  const b$ = Rx.Observable.timer(6500)

  return a$
    .takeUntil(b$)
}
