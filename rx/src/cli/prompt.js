import readline from 'readline'
import { format } from 'util'

import Rx from 'rxjs/Rx'

export function createPrompt() {
  const rl = readline.createInterface({
    output: process.stdout,
    input: process.stdin,
  })

  const close$ = Rx.Observable
    .fromEvent(rl, 'SIGINT')
    .do(() => rl.close())

  const input$ = Rx.Observable
    .fromEvent(rl, 'line')
    .do(() => rl.prompt())

  const log$ = new Rx.Subject()

  const output$ = log$
    .map(msg => Array.isArray(msg) ? format(...msg) : msg)
    .map(msg => {
      rl.pause()
      readline.clearLine(process.stdout)
      readline.moveCursor(process.stdout, -process.stdout.columns)
      console.log(msg)
      rl.resume()
      rl.prompt()
    })


  return { log$, output$, input$, close$ }
}
