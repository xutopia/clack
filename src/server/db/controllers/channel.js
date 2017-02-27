import router from 'koa-router';
import send from 'koa-send';

import Channel from '../models/channel';
import mongo from '../../config/mongo';
import ws from '../../config/socket';

function* getAllChannels() {
  // find channels user belongs to or public channels
  yield Channel.find(
    { $or: [{ members: this.params.name }, { private: false }] },
    { name: 1, id: 1, private: 1, members: 1, _id: 0 },
    (e, data) => {
      try {
        send(json(data));
      }
      catch (e) {
        console.log(e);
        send(status(500).json({ msg: 'internal server error' }));
      } 
    },
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

