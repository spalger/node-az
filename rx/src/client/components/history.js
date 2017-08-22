import { inspect } from 'util'

import React from 'react'
import { mapPropsStream } from 'recompose'
import Rx from 'rxjs/Rx'

const enhance = mapPropsStream(props$ => {
  const stream$ = props$
    .map(props => props.stream)
    .distinctUntilChanged()

  const start = Date.now()

  return stream$.mergeMap(stream => (
    Rx.Observable
      .concat(
        Rx.Observable.of([]),

        stream
          .materialize()
          .scan((acc, notification) => [
            ...acc,
            {
              ...notification,
              second: ((Date.now() - start) / 1000).toFixed(1),
            },
          ], [])
      )
      .map(notifs => ({
        notifs,
      }))
  ))
})

export const History = enhance(({ notifs }) => (
  <div className="ui segments">
    <div className="ui segment">
      <p>
        <i className="video play outline icon" /> Start (0 seconds)
      </p>
    </div>

    {notifs.map((notif, i) => {
      switch (notif.kind) {
        case 'N':
          return (
            <div key={i} className="ui segment">
              <p>
                <i className="cube icon" /> Next (+{notif.second} seconds)
              </p>
              <pre>{inspect(notif.value)}</pre>
            </div>
          )

        case 'E':
          return (
            <div key={i} className="ui segment">
              <p>
                <i className="warning sign icon" /> Error (+{notif.second} seconds)
              </p>
              <pre>{inspect(notif.error.stack || notif.error)}</pre>
            </div>
          )

        case 'C':
          return (
            <div key={i} className="ui segment">
              <p>
                <i className="checkmark icon" /> Complete (+{notif.second} seconds)
              </p>
            </div>
          )
      }
    })}
  </div>
))
