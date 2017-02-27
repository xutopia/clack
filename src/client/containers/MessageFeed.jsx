import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Feed, Icon } from 'semantic-ui-react';
import { sendMessage } from '../actions/actions';
import MessageInput from './MessageInput.jsx';
// import Notification from './components/Notification'

class MessageFeed extends React.Component {

    addLikes = (event) => {
      console.log('this is the event: ', event.target);
      console.log('this is this: ', this);
      console.log('You just clicked the like button on the message with id: ', event.target.id);
    // let likes = this.id;
    // likes ++;
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
    console.log('this is messages: ',messages);
    // console.log('here are the keys from this.props.messages: ',Object.keys(this.props.messages));
    const messageList = messages.list.map(id => messages.entities[id]).map((m, i) => {
      //can I bind this here somewhere?
      console.log('this is m.id inside the render function: ', m.id);
      const date = m.timeStamp;
      const user = m.username;
      const text = m.text;
      return (
        <Feed.Event key={`${i}:${m.id}`}>
          <Feed.Content>
            <Feed.Summary date={date} user={user}/>
            <Feed.Extra text content={text} />
            <Feed.Meta>
              <Feed.Like>
                <Icon name='like' onClick={this.addLikes}/>something that listens for clicks here and counts up likes</Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
    )}
    )
    // console.log('this is messageList: ', messageList);

    return (
      <div>
        <Feed size='large'>
          {messageList}
        </Feed>
        <MessageInput/>
      </div>
    )
  }
}

function select({ users, messages }) {
  return { users, messages };
}

export default connect(select)(MessageFeed)

/*
const date =
const user =
const text =
<Feed>
  <Feed.Event>
    <Feed.Label image={image} />
    <Feed.Content>
      <Feed.User something here /><Feed.Date content={date} /> or <Feed.Summary date user />
      <Feed.Extra  text content = {extraText} />
      <Feed.Meta>
        <Feed.Like>
          <Icon name='like' />something that listens for clicks here and counts up likes</Feed.Like>
      </Feed.Meta>
    </Feed.Content>
  </Feed.Event>
  */
  //
  // const messageList = messages.list.map(id => messages.entities[id]).map((m, i) =>
  //   <li key={`${i}:${m.id}`}><b>{m.username}: //</b>{m.text}</li>
