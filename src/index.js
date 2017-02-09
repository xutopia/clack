import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleWare} from 'redux';
import {Router, browserHistory} from 'react-router';
import promise from 'redux-promise';
import reducers from './client/reducers';
import routes from './routes';

// store below is in case we need to create store with middleware
/* const createStoreWithMiddleware = applyMiddleWare(promise)(createStore); */

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <Router history={browserHistory} routes={routes}></Router>
  </Provider>,
  document.getElementById('container')
);
