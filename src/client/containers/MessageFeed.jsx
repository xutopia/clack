import React from 'react';
import { connect } from 'react-redux';
import { Feed } from 'semantic-ui-react';
import { sendMessage, isTyping } from '../actions/actions';
// import Notification from './components/Notification'

class MessageFeed extends React.Component {
  handleSend = (event) => {
    const text = event.target.value;

    if (event.keyCode === 13 && text) {
      this.props.dispatch(sendMessage({ text }));
      event.target.value = '';
    } else if(text.length > 0) {
      const status = 'true';
      const user = this.props.app.username;
      this.props.dispatch(isTyping({ status, user }));
    } else if(text.length === 0) {
      const status = 'false';
      const user = this.props.app.username;
      this.props.dispatch(isTyping({ status, user }));
    }
  }

  showNewMsgNotification = (messages) => {
    if(messages.list.length > 0) {
      const latestMsgID = messages.list[messages.list.length - 1];
      const name = messages.entities[latestMsgID].username;
      const options = {
        body: messages.entities[latestMsgID].text
      }
      const notif = new Notification(name, options);
      setTimeout(notif.close.bind(notif), 4000);
    }
  }

  componentWillUpdate(nextProps) {
    this.showNewMsgNotification(nextProps.messages);
  }

  render () {
    const { users, messages } = this.props;
    // console.log('this is messages: ',messages);
    // console.log('here are the keys from this.props.users: ',Object.keys(this.props.users));
    const messageList = messages.list.map(id => messages.entities[id]).map((m, i) =>
      <li key={`${i}:${m.id}`}><b>{m.username}: </b>{m.text}</li>
    )

    return (
      <div>
        <input
          type="text"
          id="input-message"
          placeholder='enter a message'
          onKeyUp={this.handleSend}
        />
        {messageList}
      </div>
    )
  }
}
function select({ app, users, messages }) {
  return { app, users, messages };
}

export default connect(select)(MessageFeed)
