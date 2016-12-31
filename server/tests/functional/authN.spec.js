process.env.NODE_ENV = 'test'
const path = require('path')
const assert = require('assert')
const server = require(path.join(__dirname, '../../../server/server'))
const request = require('supertest')(server)
const db = require('../../utils/db')
const password = require('../../utils/password')
const users = db.get('users')
const jwt = require('koa-jwt')
const config = require('../../config')

describe('Authentication API', function () {
  beforeEach(function () {
    return users.drop()
      .then(function () {
        return users.insert([
          {name: 'test', password: password.encrypt('111111')}
        ])
      })
  })

  describe('authenticate with wrong user name', function () {
    it('should return 200 and \'user does not exist.\'', function () {
      return request
        .post('/api/auth')
        .type('form')
        .send({id: 'wrong user', password: 'password'})
        .expect(200, {status: 'error', error: '101', errorMessage: 'user does not exist.'})
    })
  })
  describe('login with wrong password', function () {
    it('should return 200 and \'password is not correct.\'', function () {
      return request
        .post('/api/auth')
        .type('form')
        .send({id: 'test', password: 'wrong password'})
        .expect(200, {status: 'error', error: '102', errorMessage: 'password is not correct.'})
    })
  })
  describe('login with correct user name and password', function () {
    it('should return success status and authorization token.', function () {
      return request
        .post('/api/auth')
        .type('form')
        .send({id: 'test', password: '111111'})
        .expect(200)
        .expect(function (res) {
          assert.equal(res.body.status, 'success')
          assert.ok(res.body.token)
          let payload = jwt.verify(res.body.token, config.JWT_KEY)
          assert.equal('test', payload.user)
          users.findOne({name: 'test'})
            .then(function (user) {
              assert.equal(user['loginRecord'].length, 1)
            })
        })
    })
  })
  describe('logout', function () {
    beforeEach(function () {
      return users.update(
        {name: 'test'},
        {
          $push: {
            loginRecord: {id: 'auth_id_1'}
          }
        }
      )
    })
    it('should clear login record and return \'logout success.\'', function () {
      let token = jwt.sign({user: 'test', authID: 'auth_id_1'}, config.JWT_KEY, {expiresIn: '1h'})
      return request
        .delete('/api/auth')
        .set({
          Authorization: `Bearer ${token}`
        })
        .then(function (res) {
          assert.equal(200, res.status)
          assert.equal(res.text, 'logout success.')
          return users.findOne({name: 'test'})
            .then(function (user) {
              assert.equal(user['loginRecord'].length, 0)
            })
        })
    })
  })
  describe('authorization check', function () {
    it('should failed when jwt cannot be found in user\'s login record.', function () {
      let token = jwt.sign({user: 'test', authID: 'auth_id_1'}, config.JWT_KEY, {expiresIn: '1h'})
      return request
        .delete('/api/auth')
        .set({
          Authorization: `Bearer ${token}`
        })
        .then(function (res) {
          assert.equal(401, res.status)
          assert.equal(res.text, 'permission denied.')
        })
    })
  })
})
