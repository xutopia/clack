import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleWare} from 'redux';
import App from './client/components/App.js';
import reducers from './client/reducers/index.js';

// store below is in case we need to create store with middleware
/* const createStoreWithMiddleware = applyMiddleWare(promise)(createStore); */

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>,
  document.getElementById('container')
);
