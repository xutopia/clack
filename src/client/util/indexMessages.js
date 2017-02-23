// function that will index all messages with lunr and return array of matching docs with score
import lunr from '../../../node_modules/lunr/lunr';

const generateSearchScore = (messages, searchTerm) => {
  const idx = lunr(function () {
    this.ref('id')
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

  return idx.search(searchTerm);
}

export default generateSearchScore;
