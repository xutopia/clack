// function that will index all messages with lunr and return array of matching docs with score
import lunr from '../../../node_modules/lunr/lunr';

const generateSearchIndex = (messages) => {
  const idx = lunr(function () {
    this.field('username', { boost: 10 })
    this.field('text')
  });

  for(let key in messages) {
    const doc = {
      text: messages[key].text,
      username: messages[key].username,
      id: key,
    }
    idx.add(doc);
  }
  return idx;
}

export default generateSearchIndex;
