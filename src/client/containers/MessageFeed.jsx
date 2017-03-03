import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Feed, Icon, Label } from 'semantic-ui-react';
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
      const target = m.target;
      const avatar = m.avatar;
      if(user === this.props.app.username && target !== 'all') {
        const whisperTo = `${user} to ${target}`;
        return (
          <Feed.Event key={`${i}:${m.id}`}>
            <Feed.Label>
              <img src={avatar} />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary date={date} user={whisperTo}/>
              <Feed.Extra text content={text} />
              <Feed.Meta>
                <Reactions eventKey={eventKey}/>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        )
      } else if (target === this.props.app.username) {
        const whisperFrom = `${user} to you`;
        return (
          <Feed.Event key={`${i}:${m.id}`}>
            <Feed.Label>
              <img src={avatar} />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary date={date} user={whisperFrom}/>
              <Feed.Extra text content={text} />
              <Feed.Meta>
                <Reactions eventKey={eventKey}/>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        )
      } else if(target === 'all') {
        return (
          <Feed.Event key={`${i}:${m.id}`}>
            <Feed.Label>
              <img src={avatar} />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary date={date} user={user}/>
              <Feed.Extra text content={text} />
              <Feed.Meta>
                <Reactions eventKey={eventKey}/>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        )
      } else {
          const poop = `\u{1F4A9}`;
          return (
            <Feed.Event key={`${i}:${m.id}`}>
              <Feed.Label>
                <img src={avatar} />
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary date={date} user={user}/>
                <Feed.Extra text content={poop} />
                <Feed.Meta>
                  <Reactions eventKey={eventKey}/>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          )
        }
      });
    // console.log('this is messageList: ', messageList);

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

const mapStateToProps = ({ app, users, messages }) => {
  return { app, users, messages };
}

export default connect(mapStateToProps)(MessageFeed)
