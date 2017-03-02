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

  onPrivateMessageSubmit = (event) => {
    console.log('sending......')
    const target = this.state.secretRecipient;
    const text = this.state.secretMessage;
    this.props.dispatch(sendPrivateMessage({ target, text }));
    this.setState({
      secretRecipient: '',
      secretMessage: '',
    });
    event.preventDefault();
  }

  handleRecipientInput = (event, state) => {
    const value = event.target.value;
    this.setState({ ...state, secretRecipient: value });
  }

  handleMessageInput = (event, state) => {
    const value = event.target.value;
    this.setState({ ...state, secretMessage: value });
  }


  render() {
    return (
      <div>
        <form onSubmit={(e) => this.onPrivateMessageSubmit(e)}>
          Secret Message Recipient: <br />
          <Input
            type="text"
            id="input-secretMsg-recipient"
            placeholder="receiver's name"
            value={this.state.secretRecipient}
            onChange={(event) => this.handleRecipientInput(event, this.state)}
          />
          Secret Message: <br />
          <Input
            type="text"
            id="input-secretMsg-content"
            placeholder="message content"
            value={this.state.secretMessage}
            onChange={(event) => this.handleMessageInput(event, this.state)}
          />
        <input type="submit"></input>
        </form>
      </div>
    )
  }
}

export default connect()(PrivateMessageInput);
