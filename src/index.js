import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './client/App';
import Landing from './client/Landing';
import Room from './client/Room';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/room" component={Room} />
      </div>
  </Router>,
  document.getElementById('container')
)
