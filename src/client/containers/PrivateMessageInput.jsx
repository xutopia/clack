// component for user to enter a target name and a message to be sent to the target as a private message
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { sendPrivateMessage } from '../actions/actions';

class PrivateMessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secretRecipient: '',
    }
  }

  handlePrivateSend = (event) => {

  }
  render() {
    return (
      <div>
        Secret Recipient: <br />
        <Input />
        Secret Message: <br />
        <Input />
      </div>
    )
  }
}

export default connect()(PrivateMessageInput);
