// search reducer that will update the state to include the new search term
import { createReducer } from 'redux-act';
import { newSearch } from '..actions/actions';
import initial from '../reducers/initial';

const search = createReducer({
  [newSearch]: (state, payload) => {
    const { searchTerm } = payload;
    // invoke the helper function to do the lunr searching, return array of matches and score
    return {
      ...state,
      searchTerm,
      searchResultScores: results,
    };
  },
}, initial)

export default search
