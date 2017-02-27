import router from 'koa-router';

import Channel from '../models/channel';
import mongo from '../../config/mongo';
import ws from '../../config/socket';

function* getAllChannels(next) {
  // find channels user belongs to or public channels
  yield next
  Channel.find(
    { $or: [{ between: req.params.name }, { private: false }] },
    { name: 1, id: 1, private: 1, between: 1, _id: 0 },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'internal server error' });
      }
      res.json(data);
    },
  );
}

function* createChannel(next) {
  yield next
  const newChannel = new Channel(req.body);
  newChannel.save((err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: 'internal server error' });
      }
      res.json(data);
    });
}

const channel = new router()

channel.get('/channels/:name', getAllChannels)
channel.get('/channels/:name', createChannel)

// export our routes to be imported in index.js and registered with koa
export default channel
