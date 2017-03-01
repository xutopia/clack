import router from 'koa-router';

import { log, b } from '../../util/logging';
import Channel from '../models/channel';
import db from '../../config/mongo';
import ws from '../../config/socket';

// find channels user belongs to or public channels
function* getAllChannels() {
  const ctx = this;
  log(`mongodb status before making query: ${b(db.readyState)}`);
  yield Channel.find(
    { $or: [{ members: ctx.params.name }, { private: false }] },
    {},
    (e, data) => {
      if (e) {
        log(e);
        ctx.response.status = 500;
      } else {
        ctx.body = data;
      }
    }
  );
}

function* createChannel() {
  const ctx = this;
  const newChannel = new Channel({
    name: ctx.request.body.name,
    private: ctx.request.body.private,
    members: ctx.request.body.members
  });
  try {
    yield* newChannel.save(newChannel)
    ctx.body = "Successfully saved new channel in db."
  } catch (e) {
    ctx.throw(500, e)
  }
}

const channel = new router();

channel.get('/channels/', getAllChannels);
channel.post('/channels/create', createChannel);

// export our routes to be imported in index.js and registered with koa
export default channel;
