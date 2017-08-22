import React from 'react'
import { NavLink, Route, Switch, Redirect } from 'react-router-dom'

import { Example } from './example'

export const Home = ({ examples }) => (
  <div>
    <h1 className="ui header">Examples</h1>
    <div className="ui pointing menu">
      {examples.map(({ name }) => (
        <NavLink
          key={name}
          className="item"
          activeClassName="active"
          to={`/example/${name.toLowerCase()}`}
        >
          {name}
        </NavLink>
      ))}
    </div>
    <div className="ui segment">
      <Switch>
        {examples.map((props) => (
          <Route
            exact
            key={props.name}
            path={`/example/${props.name.toLowerCase()}`}
            render={() => (<Example {...props} />)}
          />
        ))}

        <Redirect to={`/example/${examples[0].name.toLowerCase()}`}/>
      </Switch>
    </div>
  </div>
)
