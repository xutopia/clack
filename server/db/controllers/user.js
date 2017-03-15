import router from 'koa-router';

import User from '../models/user';
import ws from '../../config/socket';

function* createUser() {
  const ctx = this
  const newUser = new User({
    username: ctx.request.body.username,
    password: ctx.request.body.password,
    email: ctx.request.body.email
  })
  console.log('line:  ', newUser);
  try {
    yield* newUser.save(newUser)
    ctx.response.status = 201;
  } catch (e) {
    ctx.throw(500, e)
  }
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

function* getAllUsernames() {
  const ctx = this
  yield User
    .find({})
    .select('username')
    .exec()
}

const user = new router();

user.post('/auth/signup', createUser);
user.get('/auth/signin', signIn);
user.get('/auth/signout', signOut);
user.get('/auth/cred', getCredentials);
user.get('/auth/allnames', getAllUsernames);

// export our routes to be imported in index.js and registered with koa
export default user
