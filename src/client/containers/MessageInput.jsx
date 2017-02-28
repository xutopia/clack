import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Input } from 'semantic-ui-react';
import { sendMessage, isTyping } from '../actions/actions';

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    }
  }

  onMessageSubmit = (event) => {
    const text = this.state.message;
    const timeStamp = new Date();
    this.props.dispatch(sendMessage({ text, timeStamp }));
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
