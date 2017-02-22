import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react'
import { connect } from 'react-redux';
// import createHistory from 'history/createBrowserHistory';

import Landing from './Landing'
import Room from './Room'

import { logout } from './actions/actions'

// const history = createHistory()

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Landing} />
        <Route exact path="/room" component={Room} />
      </div>
    </BrowserRouter>
  );
}

function select({ app }) {
  return { ...app };
}

export default connect(select)(App);
