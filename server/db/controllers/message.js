import router from 'koa-router';

import Message from '../models/message';
import { log, b } from '../../util/logging';
import ws from '../../config/socket';

function* getAllMessages() {
  const ctx = this
  yield Message
    .find({})
    .select('channelID text username timeStamp')
    .exec( (e, data) => {
      if (e) {
        log(e);
        ctx.response.status = 500
      } else {
        ctx.body = data
      }
    }
  )
}

// BUG: handler is not returning messages for specified channel
function* getAllMessagesForChannel() {
  const ctx = this
  yield Message
    .find({"channelID": ctx.request.params.channelID})
    .where('message.channelID').equals(ctx.request.params.channelID)
    .select('channelID text username timeStamp')
    .exec( (e, data) => {
      if (e) {
        log(e);
        ctx.response.status = 500
      } else {
        ctx.body = data
      }
    }
  )
}

function* createMessage() {
  const ctx = this;
  const newMessage = new Message({
    channelID: ctx.request.body.channelID,
    text: ctx.request.body.text,
    username: ctx.request.body.username,
    timeStamp: new Date()
  });
  try {
    yield newMessage.save(newMessage)
    ctx.body = "Successfully saved new message in db."
  } catch (e) {
    ctx.throw(500, e)
  }
}

const message = new router()
message.get('/messages', getAllMessages);
message.get('/messages/:channel', getAllMessagesForChannel);
message.post('/messages/create', createMessage);

// export our routes to be imported in index.js and registered with koa
export default message
