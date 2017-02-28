import router from 'koa-router';
import { log, b } from '../../util/logging'
import Channel from '../models/channel';
import db from '../../config/mongo';
import ws from '../../config/socket';

// find channels user belongs to or public channels
function* getAllChannels() {
  const ctx = this;
  log(`mongodb status before making query: ${b(db.readyState)}`);
  yield Channel.find(
    { $or: [{ members: ctx.params.name }, { private: false }] },
    { name: 1, id: 1, private: 1, members: 1, _id: 0 },
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
  const newChannel = new Channel(this.body);
  yield newChannel.save((err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'internal server error' });
    }
    res.json(data);
  });
}

const channel = new router();

channel.get('/channels/', getAllChannels);
channel.post('/channels/:name', createChannel);

// export our routes to be imported in index.js and registered with koa
export default channel;
