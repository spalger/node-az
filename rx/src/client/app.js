import React from 'react'
import { Route } from 'react-router-dom'

import { Home } from './components'
import { examples } from './examples'

export const App = () => (
  <Route path="/" render={() => (<Home examples={examples} />)} />
)
