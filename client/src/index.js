import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleWare} from 'redux';
import {Router} from 'react-router';
import promise from 'redux-promise';
import reducers from '../reducers';


const createStoreWithMiddleware = applyMiddleWare(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)},
  document.getElementById('container')
);
