import React from 'react'
import { connect } from 'react-redux';

import Landing from './Landing'
import Room from './Room'

import { logout } from './actions/actions'

class App extends React.Component {
  handleLogout() {
    this.props.dispatch(logout());
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

function select({ app }) {
  return { ...app };
}

export default connect(select)(App);
