// search reducer that will update the state to include the new search term
import { createReducer } from 'redux-act';
import { searchMessages } from '../actions/actions';
import initial from '../reducers/initial';
import generateSearchScore from '../util/searchResultScore';

const search = createReducer({
  [searchMessages]: (state, payload) => {
    const { searchTerm } = payload;
    const { idx } = payload;
    // invoke the helper function to do the lunr searching, return array of matches and score
    const searchResultScores = generateSearchScore(searchTerm, idx)
    return {
      ...state,
      searchTerm,
      resultScores: searchResultScores,
    };
  },
}, initial.search)

export default search
