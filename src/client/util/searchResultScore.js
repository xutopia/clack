// function that will return the scoring of all the messages that have been indexed with lunr
import lunr from 'lunr';

const generateSearchScore = (searchTerm, index) => {
  return index.search(searchTerm);
}

export default generateSearchScore;
