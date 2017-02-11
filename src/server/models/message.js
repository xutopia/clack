const db = require('./db');

const Message = {};

Message.addNewMessage = function (messageObject) {
  // messageObject will come from the front-end with username, message, timestamp properties
  return db('users').where({ username: messageObject.username }).select('userid')
  .then(function(iduser) {
    db('messages').insert({ message: messageObject.message, timestamp: messageObject.timestamp, iduser: iduser })
  })
  .catch(function (err) {
    console.error(err);
  });
};

// Message.retrieveMessages = function (channel) {
// return db('messages')
// .then(function (messages) {
// return messages;
// })
// .catch(function (err) {
// console.error(err);
// })
// }
