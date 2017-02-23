import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react'
import { connect } from 'react-redux';


import Landing from './Landing'
import Room from './components/Room'

import { logout } from './actions/actions'

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
