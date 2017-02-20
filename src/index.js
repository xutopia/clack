import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './client/store/index';

import App from './client/App';
import Landing from './client/Landing';
import Room from './client/Room';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <App>
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/room" component={Room} />
        </div>
      </App>
    </Router>
  </Provider>,
  document.getElementById('container'),
);
