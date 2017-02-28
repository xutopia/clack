// component to show users that are typing
import React, { Component } from 'react';
import { connect } from 'react-redux';
import findTypersTyping from '../util/findTypersTyping';

class TypingStatuses extends Component {

  render() {
    const typersTyping = findTypersTyping(this.props.app.username, this.props.users);
    return (
      <div>
        {typersTyping}
      </div>
    )
  }
}

const mapStateToProps = ({ app, users }) => {
  return { app, users };
}

export default connect(mapStateToProps)(TypingStatuses);
