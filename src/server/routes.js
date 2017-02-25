import express from 'express';
import router from 'koa-router';
import bodyParser from 'body-parser';

import User from './db/models/user';
import Message from './db/models/message';
import Channel from './db/models/channel';

const local = 'local-signup'
router.use(bodyParser.json());

const channelRoutes = router => {
  // return all channels for given user (including private channels).
  router.get('/channels/:name', (req, res) => {
    Channel.find(
      // find channels user belongs to or public channels
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
  });

  // post newly-created channel to mongo list
  router.post('/channels/newChannel', (req, res) => {
    let newChannel = new Channel(req.body);
    newChannel.save((err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'internal server error' });
      }
      res.json(data);
    });
  });
}

const messageRoutes = router => {
  // get all messages
  router.get('/messages', (req, res) => Message.find({},
    {id: 1, channelID: 1, text: 1, user: 1, time: 1, _id: 0},
    (err, data) => {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  );

  // get messages for specified channel
  router.get('/messages/:channel', (req, res) => {
    Message.find({channelID: req.params.channel}, {id: 1, channelID: 1, text: 1, user: 1, time: 1, _id: 0}, (err, data) => {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  })

  //post a new message to db
  router.post('/addMessage', (req, res) => {
    let newMessage = new Message(req.body);
    newMessage.save((err, data) => {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });
}

const userRoutes = (router, passport) => {
  router.post('/signUp', passport.authenticate(local, { session: false}), (req, res) => {
    res.json(req.user);
  });

  router.post('/signIn', passport.authenticate(local, { session: false}), (req, res) => {
    res.json(req.user);
  });

  router.get('/signOut', (req, res) => {
    req.logout();
    res.end();
  });

  //get auth credentials from server
  router.get('/auth/get', (req, res) => res.json(req.user));

  // get usernames for validating whether a username is available
  router.get('/allUsernames', (req, res) => {
    User.find({'local.username': { $exists: true } }, {'local.username': 1, _id:0}, (err, data) => {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  })
};

export { channelRoutes, messageRoutes, userRoutes }
