import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { sendMessage } from '../actions/actions';

class MessageInput extends React.Component {
  handleSend = (event) => {
    const text = event.target.value;

    if (event.keyCode === 13 && text) {
      console.log('this event happened: ', event.timeStamp);
      console.log('this is the text of the message: ', text);
      const timeStamp = new Date();
      this.props.dispatch(sendMessage({ text, timeStamp }));
      event.target.value = '';
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

function mapStateToProps({ messages }) {
  return { messages };
}

export default connect(mapStateToProps)(MessageInput);
