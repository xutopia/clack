// function that will index all messages into lunr
import lunr from 'lunr';

const generateMessagesIndex = (messages) => {
  const idx = lunr(() => {
    this.field('title', { boost: 10 })
    this.field('body')
  });
}

export default generateMessagesIndex;
