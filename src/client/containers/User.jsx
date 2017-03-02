import React, { Component } from 'react';
import { connect } from 'react-redux';
import renderGreeting from '../util/renderGreeting';

class User extends Component {
  render() {
    const greeting = renderGreeting(this.props.app.username);
    return (
      <div>
        {greeting}
      </div>
    )
  }
}

const mapStateToProps = ({ app }) => {
  return { app }
}

export default connect(mapStateToProps)(User)
