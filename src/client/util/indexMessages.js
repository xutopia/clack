// function that will index all messages into lunr
import lunr from 'lunr';

const generateMessagesIndex = (messages) => {
  const idx = lunr(() => {
    this.field('username', { boost: 10 })
    this.field('text')
  });

  for(let key in messages) {
    const doc = {
      text: messages.text,
      username: messages.username,
      id: key,
    }
    idx.add(doc);
  }

  return idx;
}

export default generateMessagesIndex;
