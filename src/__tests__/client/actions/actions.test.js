import { setCurrentUser } from '../../../client/actions/actions'
import * as types from '../../../client/actions/actionTypes'

describe('actions', () => {

  describe('setCurrentUser', () => {
    it('should have a type of SET_CURRENT_USER', () => {
      expect(setCurrentUser().type).toEqual(types.SET_CURRENT_USER)
    })

    it('should pass on the user we pass in', () => {
      let currentUser = 'Peter'
      expect(setCurrentUser(currentUser).currentUser).toEqual(currentUser)
    })
  })
})
