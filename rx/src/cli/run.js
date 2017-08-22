import Rx from 'rxjs/Rx'

import { startApp } from '../server'
import { createPrompt } from './prompt'
import { createConfig$ } from './config'

const { input$, log$, output$, close$ } = createPrompt()

Rx.Observable
  .merge(
    output$,
    startApp(log$, createConfig$(input$, log$))
  )
  .do({
    complete() {
      console.error('UNEXPECTED COMPLETION')
    },
  })
  .takeUntil(close$)
  .subscribe({
    error(error) {
      console.error('ERROR', error.stack)
    },
  })
