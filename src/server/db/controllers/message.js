import router from 'koa-router';

import Message from '../models/message';
import mongo from '../../config/mongo';
import ws from '../../config/socket';

function* getAllMessages(next) {
  yield next
  Message.find(
    {},
    { id: 1, channelID: 1, text: 1, user: 1, time: 1, _id: 0 },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'internal server error' });
      }
      res.json(data);
    },
  );
}

function* getAllMessagesForChannel(next) {
  yield next
  Message.find(
    { channelID: req.params.channel },
    { id: 1, channelID: 1, text: 1, user: 1, time: 1, _id: 0 },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'internal server error' });
      }
      res.json(data);
    },
  );
}

function* createMessage() {
  const newMessage = new Message(this.body);
  newMessage.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: 'internal server error' });
    }
    res.json(data);
  });
}

const message = new router()
message.get('/messages', getAllMessages);
message.get('/messages/:channel', getAllMessagesForChannel);
message.get('/messages/create', createMessage);

// export our routes to be imported in index.js and registered with koa
export default message
