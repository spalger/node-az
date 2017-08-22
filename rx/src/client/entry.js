import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import rxjsconfig from 'recompose/rxjsObservableConfig'
import { setObservableConfig } from 'recompose'

setObservableConfig(rxjsconfig)

import { App } from './app'

const root = document.getElementById('root')
render(<BrowserRouter><App /></BrowserRouter>, root)
