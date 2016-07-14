var assert = require('chai').assert
var password = require('../../../../server/utils/password')

describe('password util', function () {
  describe('encrypt method', function () {
    it('should encrypt password string to an 60 char string', function () {
      assert.equal(60, password.encrypt(password).length)
    })
  })

  describe('compare method', function () {
    it('should return true when given password is matched with hash', function () {
      var hash = password.encrypt('111111')
      assert.isTrue(password.compare('111111', hash))
    })
    it('should return false when given password is not matched with hash', function () {
      var hash = password.encrypt('111111')
      assert.isFalse(password.compare('111112', hash))
    })
  })
})
