import Rx from 'rxjs/Rx'
import Joi from 'joi'
import set from 'lodash.set'
import merge from 'lodash.merge'

const SCHEMA = Joi.object().default().keys({
  port: Joi.number().default(9000),
})

const commandFormatRE = /^\s*([a-zA-Z\.]+)\s*=(.+)$/

function normalize(input) {
  const { error, value } = SCHEMA.validate(input, {
    abortEarly: false,
  })
  if (error) {
    throw error
  }
  return value
}

export const createConfig$ = (input$, log$) => {
  // stream of [key, value] changes to make to config
  const cmd$ = input$
    .mergeMap(line => {
      if (!commandFormatRE.test(line)) {
        log$.next('invalid command format, expected "name=value"')
        return []
      } else {
        const [,key,value] = line.match(commandFormatRE)
        return [[key, value]]
      }
    })

  // start with undefined to kick things off, then on each cmd
  // attempt to merge and validate the desired config change
  return Rx.Observable
    .of(undefined)
    .concat(cmd$)
    .scan((config, cmd) => {
      if (!config) {
        // initialize with the defaults
        return normalize({})
      }

      try {
        const [key, value] = cmd
        return normalize(merge({}, config, set({}, key, value)))
      } catch (error) {
        log$.next('invalid command:', error.message)
        return config
      }
    }, undefined)
}
