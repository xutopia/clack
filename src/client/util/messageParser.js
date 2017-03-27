// helper functions to parse the text into potential target and message content
export const parseTarget = (text) => {
  const regex = /^\/;[^;]*/;
  const target = text.match(regex);
  return target === null ? 'all' : target[0].slice(2);
}

export const parseMessage = (text) => {
  const regex = /^\/;[^;]*/;
  const message = text.replace(regex, '');
  return message[0] === ';' ? message.slice(2) : message;
}

export const findValidRecipient = (users, target) => {
  if (target === 'all') {
    return target;
  }
  return users[target] === undefined ? null : target;
}
