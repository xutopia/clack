import { setCurrentUser } from '../../../client/actions'

describe('actions', () => {

  describe('setCurrentUser', () => {
    it('should have a type of CHANGE_LOCATION', () => {
      expect(setCurrentUser().type).toEqual('SET_CURRENT_USER')
    })

    it('should pass on the user we pass in', () => {
      let user = 'Peter'
      expect(setCurrentUser(user).user).toEqual(user)
    })
  })
})
