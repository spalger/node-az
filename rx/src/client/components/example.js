import React from 'react'
import { withProps } from 'recompose'
import { History } from './history'

const enhance = (
  withProps(({ makeStream }) => ({
    stream: makeStream(),
  }))
)

export const Example = enhance(({ name, code, stream }) => (
  <div>
    <h1>{name}</h1>
    <pre>{code}</pre>
    <History stream={stream} />
  </div>
))
