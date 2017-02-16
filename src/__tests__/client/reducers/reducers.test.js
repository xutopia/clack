import mainReducer from '../../../client/reducers/reducers'

describe('mainReducer', () => {
  
  it('should return the initial state', () => {
    expect(mainReducer(undefined, {})).toEqual({
      currentUser: ''
    })
  })

  it('should react to an action with the type SET_CURRENT_USER', () => {
    let currentUser = 'Jeff'
    expect(mainReducer(undefined, {
      type: 'SET_CURRENT_USER',
      currentUser
    })).toEqual({
      currentUser
    })
  })

})
