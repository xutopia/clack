// search reducer that will update the state to include the new search term
import { createReducer } from 'redux-act';
import { searchMessages } from '../actions/actions';
import initial from '../reducers/initial';
import generateSearchScore from '../util/indexMessages';

const search = createReducer({
  [searchMessages]: (state, payload) => {
    const { searchTerm } = payload;

    // invoke the helper function to do the lunr searching, return array of matches and score
    const searchResultScores = generateSearchScore()
    return {
      ...state,
      searchTerm,
    };
  },
}, initial.search)

export default search
