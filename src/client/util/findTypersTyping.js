// utility function to find all the users that are typing

export default (users) =>{
  const activeUsersTyping = findTypingUsers(users);
  return generateTypingStatusMsg(activeUsersTyping);
}

const findTypingUsers = (users) => {
  let typingUsers = [];
  for(var key in users) {
    if(users[key].typingStatus) {
      typingUsers.push(key);
    }
  }
  return typingUsers;
}

const generateTypingStatusMsg = (activeUsersTyping) => {
  if(activeUsersTyping.length > 5) {
    return 'TOO MANY PEOPLE ARE TYPING!!!';
  } else if (activeUsersTyping.length > 3) {
    return 'several people are typing...';
  } else if (activeUsersTyping.length > 0) {
    return populateNames(activeUsersTyping);
  } else {
    return '';
  }
}

const populateNames = (typers) => {
  let msg = `typing...`;
  if(typers.length === 1) {
    msg = `${typers[0]} is ${msg}`;
  } else if (typers.length === 2) {
    msg = `${typers[0]} and ${typers[1]} are ${[msg]}`;
  } else {
    msg = `${typers[0]}, ${typers[1]}, and ${typers[2]} are ${msg}`;
  }
  return msg;
}
