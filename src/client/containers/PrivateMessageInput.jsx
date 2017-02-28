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
      secretMessage: '',
    }
  }

  handlePrivateSend = (event) => {

  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.onSearchSubmit(e)}>
          Secret Message Recipient: <br />
          <Input
            type="text"
            id="input-secretMsg-recipient"
            placeholder="receiver's name"
            value={this.state.secretRecipient}
            onChange={(event) => this.handleRecipientInput(event)}
          />
          Secret Message: <br />
          <Input
            type="text"
            id="input-secretMsg-content"
            placeholder="message content"
            value={this.state.secretMessage}
            onChange={(event) => this.handleMessageInput(event)}
          />
        </form>
      </div>
    )
  }
}

export default connect()(PrivateMessageInput);
