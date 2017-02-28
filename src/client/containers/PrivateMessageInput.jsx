// component for user to enter a target name and a message to be sent to the target as a private message
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { sendPrivateMessage } from '../actions/actions';

class PrivateMessageInput extends Component {
  render() {
    return (
      <div>
        A PRIVATE MESSAGE THINGY!
      </div>
    )
  }
}

export default connect()(PrivateMessageInput);
