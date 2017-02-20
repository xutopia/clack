import React from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './Landing'
import Room from './Room'

import { logout } from './actions/actions'

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Landing} />
        <Route exact path="/room" component={Room} />
      </div>
    </Router>
  );
}

function select({ app }) {
  return { ...app };
}

export default connect(select)(App);
