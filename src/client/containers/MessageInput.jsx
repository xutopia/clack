import React, { Component } from 'react';


export default class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
  }

  onMessageSubmit(message) {
    // do something in here to give the message to the socket
  }

  render() {
    return (
      <div>
        Enter your message below to chat
        <form onSubmit={this.onMessageSubmit}>
          <input placeholder="Share your thoughts!" />
          <span>
            <button type="submit">Submit</button>
          </span>
        </form>
      </div>
    );
  }
}
