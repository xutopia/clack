import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Feed, Icon } from 'semantic-ui-react';
import MessageInput from './MessageInput.jsx';
import Reactions from './Reactions.jsx';
import TypingStatuses from './TypingStatuses.jsx';



class MessageFeed extends React.Component {
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
    if(nextProps.messages.list.length !== this.props.messages.list.length) {
      this.showNewMsgNotification(nextProps.messages);
    }
  }

  render () {
    const { users, messages } = this.props;
    // console.log('this is messages: ',messages);
    const messageList = messages.list.map(id => messages.entities[id]).map((m, i) => {
      const date = m.timeStamp;
      const user = m.username;
      const text = m.text;
      const eventKey = m.id;
      return (
        <Feed.Event key={`${i}:${m.id}`}>
          <Feed.Content>
            <Feed.Summary date={date} user={user}/>
            <Feed.Extra text content={text} />
            <Feed.Meta>
              <Reactions eventKey={eventKey}/>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      )}
    )

    return (
      <div>
        <Feed size='large'>
          {messageList}
        </Feed>
        <TypingStatuses />
      </div>
    )
  }
}

const mapStateToProps = ({ users, messages }) => {
  return { users, messages };
}

export default connect(mapStateToProps)(MessageFeed)
