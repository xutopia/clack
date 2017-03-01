import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Input } from 'semantic-ui-react';
import { sendMessage, isTyping } from '../actions/actions';
import { parseMessage, parseTarget } from '../util/messageParser';

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    }
  }

  onMessageSubmit = (event) => {
    const text = parseMessage(this.state.message);
    const target = parseTarget(this.state.message) || 'all';
    this.props.dispatch(sendMessage({ text, target }));
    this.setState({
      message: '',
    })
    event.preventDefault();
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
