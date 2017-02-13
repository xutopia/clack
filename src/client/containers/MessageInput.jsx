import React, { Component } from 'react';


export default class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };

    this.onMessageSubmit = this.onMessageSubmit.bind(this);
  }

  onMessageSubmit(message) {
    // do something in here to give the message to the socket
    console.log('submitting a new message')
  }

  onInputChange(val) {
    this.setState({
      message: val,
    });
  }

  render() {
    return (
      <div>
        Enter your message below to chat
        <form onSubmit={this.onMessageSubmit}>
          <input
            placeholder="Share your thoughts!"
            type="text"
            value={this.state.message}
            onChange={event => this.onInputChange(event.target.value)}
          />
          <span>
            <button type="submit">Submit</button>
          </span>
        </form>
      </div>
    );
  }
}
