import React from 'react'
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Landing from './Landing'
import Room from './components/Room'
import Sidebar from 'grommet/components/Sidebar'

import { logout } from './actions/actions'

const history = createHistory()

const App = () => {
  return (
    <Router history={history}>
      <div>
        <Route exact path="/" component={Landing} />
        <Route exact path="/room" component={Room} />
        <Route exact path="/sidebar" component={Sidebar} />

      </div>
    </Router>
  );
}

function select({ app }) {
  return { ...app };
}

export default connect(select)(App);
