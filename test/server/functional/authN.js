const path = require('path')
const assert = require('assert')
const server = require(path.join(__dirname, '../../../server/server'))
const request = require('supertest')(server)
const db = require('../../../server/utils/db')
const password = require('../../../server/utils/password')
const users = db.get('users')

describe('Authentication API', function () {
  before(function (done) {
    Promise.all([
      users.drop(),
      users.insert([
        {name: 'test', password: password.encrypt('111111')}
      ])
    ]).then(function () {
      done()
    })
  })

  describe('authenticate with wrong user name', function () {
    it('should return 401 and \'user does not exist.\'', function (done) {
      request
        .post('/api/auth')
        .type('form')
        .send({username: 'wrong user', password: 'password'})
        .expect(401, 'user does not exist.', done)
    })
  })
  describe('login with wrong password', function () {
    it('should return 401 and \'password is not correct.\'', function (done) {
      request
        .post('/api/auth')
        .type('form')
        .send({username: 'test', password: 'wrong password'})
        .expect(401, 'password is not correct.', done)
    })
  })
  describe('login with correct user name and password', function () {
    it('should return success status and authorization token.', function (done) {
      request
        .post('/api/auth')
        .type('form')
        .send({username: 'test', password: '111111'})
        .expect(200)
        .expect(function (res) {
          assert.equal(res.body.status, 'success')
          assert.ok(res.body.token)
        })
        .end(done)
    })
  })
})
