import mainReducer from '../../../client/reducers/reducers'

describe('mainReducer', () => {
  it('should return the initial state', () => {
    expect(mainReducer(undefined, {})).toEqual({
      currentUser: ''
    })
  })
})
