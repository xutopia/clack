import router from 'koa-router';

import User from '../models/user';
import mongo from '../../config/mongo';
import ws from '../../config/socket';

const local = 'local-signup';

function* createUser() {
  const user = this.request.body;
  user._id = yield mongo.getNextSequence('userId');
  const results = yield mongo.users.insertOne(user);
  this.status = 201;
  this.body = { id: results.ops[0]._id };
}
function* signIn(next) {
  yield next
  res.json(this.user);
}

function* signOut(next) {
  yield next
  this.logout();
  res.end();
}

function* getCredentials(next) {
  yield next
  res.json(this.user);
}

function* getAllUsernames(next) {
  yield next
  User.find(
    { 'local.username': { $exists: true } },
    { 'local.username': 1, _id: 0 },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'internal server error' });
      }
      res.json(data);
    },
  );
}

const user = new router();

user.get('/auth/signup', createUser);
user.get('/auth/signin', signIn);
user.get('/auth/signout', signOut);
user.get('/auth/cred', getCredentials);
user.get('/auth/allnames', getAllUsernames);

// export our routes to be imported in index.js and registered with koa
export default user
