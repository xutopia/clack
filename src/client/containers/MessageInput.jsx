import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Input } from 'semantic-ui-react';
import { sendMessage, isTyping, sendPrivateMessage } from '../actions/actions';
import { parseMessage, parseTarget, findValidRecipient } from '../util/messageParser';

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    }
  }

  onMessageSubmit = (event) => {
    event.preventDefault();
    let text = '';
    let target = '';
    if (this.state.message[0] === '/' && this.state.message[1] === ';') {
      text = parseMessage(this.state.message);
      const potentialTarget = parseTarget(this.state.message);
      target = findValidRecipient(this.props.users, potentialTarget);
    } else {
      text = this.state.message;
      target = 'all';
    }
    if (target !== null && text.length > 0) {
      this.props.dispatch(sendMessage({ text, target }));
      this.setState({
        message: '',
      })
    } else {
      window.alert(`WOAH! You're Clacking too fast!
        You are most likely whispering to a user that is not in the room, or you mispelled their name, or you forgot a semicolon.`);
    }
  }

  handleTyping = (event, state) => {
    const message = event.target.value;
    this.setState({ message });
  }

  handleTypingStatus = (status) => {
    const user = this.props.app.username;
    const userStatus = true;
    if(status.length > 0) {
      const typingStatus = true;
      this.props.dispatch(isTyping({ typingStatus, user, userStatus }));
    } else if(status.length === 0) {
      const typingStatus = false;
      this.props.dispatch(isTyping({ typingStatus, user, userStatus }));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.message !== this.state.message;
  }

  componentWillUpdate(nextProps, nextState) {
    this.handleTypingStatus(nextState.message);
  }

  render () {
    const { messages } = this.props;
    return (
      <div>
        <form onSubmit={(e) => this.onMessageSubmit(e)}>
          <Input
            fluid
            icon='smile'
            placeholder='enter a message'
            value={this.state.message}
            onChange={(event) => this.handleTyping(event, this.state)}
          />
        </form>
      </div>
    )
  }
}

function mapStateToProps({ app, users, messages }) {
  return { app, users, messages };
}

export default connect(mapStateToProps)(MessageInput);
