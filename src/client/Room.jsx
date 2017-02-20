import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';

import { sendMessage } from '../client/actions/actions';

class Room extends React.Component {
  handleSend = (event) => {
    const text = event.target.value;
    if (event.keyCode === 13 && text) {
      this.props.dispatch(sendMessage({ text }));
      event.target.value = '';
    }
  }

  render () {
    const { users, messages } = this.props;
    console.log(this.props);
    const messageList = messages.list.map(id => messages.entities[id]).map((m, i) =>
      <li key={`${i}:${m.id}`}><b>{m.username}: </b>{m.text}</li>
    )
    return (
      <div>
        <h1>CLACK Chat!</h1>
        <input
          type="text"
          id="input-message"
          placeholder='enter a message'
          onKeyUp={this.handleSend}
        />
        {messageList}
        <div>
        </div>
      </div>
    )
  }
}

function select({ users, messages }) {
  return { users, messages };
}

export default connect(select)(Room)
