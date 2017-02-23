// search reducer that will update the state to include the new search term
import { createReducer } from 'redux-act';
import { searchMessages } from '../actions/actions';
import initial from '../reducers/initial';

const search = createReducer({
  [searchMessages]: (state, payload) => {
    const { searchTerm } = payload;
    // const entities = { ...state.messages.entities };
    // invoke the helper function to do the lunr searching, return array of matches and score
    // const searchResultScores = generateSearchScore(entities, 'cheng')
    return {
      ...state,
      searchTerm: '',
      resultScores: [...state],
    };
  },
}, initial.search)

export default search
