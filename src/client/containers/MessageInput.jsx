import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Input } from 'semantic-ui-react';
import { sendMessage, isTyping } from '../actions/actions';

class MessageInput extends React.Component {
  handleSend = (event) => {
    const text = event.target.value;
    const user = this.props.app.username;

    if (event.keyCode === 13 && text) {
      let timeStamp = moment().fromNow();
      this.props.dispatch(sendMessage({ text, timeStamp }));
      event.target.value = '';
    } else if(text.length > 0) {
      const typingStatus = true;
      const userStatus = true;
      this.props.dispatch(isTyping({ typingStatus, user, userStatus }));
    } else if(text.length === 0 && this.props.users[user].typingStatus) {
      const typingStatus = false;
      const userStatus = true;
      this.props.dispatch(isTyping({ typingStatus, user, userStatus }));
    }
  }

  render () {
    const { messages } = this.props;
    return (
      <div>
        <Input
        fluid
        icon='smile'
        placeholder='enter a message'
        onKeyUp={this.handleSend}
        />
      </div>
    )
  }
}

function mapStateToProps({ app, users, messages }) {
  return { app, users, messages };
}

export default connect(mapStateToProps)(MessageInput);
