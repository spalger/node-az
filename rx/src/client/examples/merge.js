import Rx from 'rxjs/Rx'

export function makeMergeStream() {
  const a$ = Rx.Observable
    .timer(0, 2000)
    .map(i => `a: ${i}`)

  const b$ = Rx.Observable
    .timer(0, 4000)
    .map(i => `b: ${i}`)

  return Rx.Observable
    .merge(a$, b$)
}
