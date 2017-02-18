import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'

import io from 'socket.io-client'
export const socket = io('http://localhost:8080')
import Landing from './client/Landing';
import Room from './client/Room';

import RootReducer from './client/reducers/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const logger = createLogger()
const store = createStore(
  RootReducer,
  composeEnhancers(
    applyMiddleware(logger),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/room" component={Room} />
        </div>
    </Router>
  </Provider>,
  document.getElementById('container')
)
