import Rx from 'rxjs/Rx'

export function makeMapStream() {
  return Rx.Observable
    .timer(0, 2000)
    .map(i => `a: ${i}`)
}
