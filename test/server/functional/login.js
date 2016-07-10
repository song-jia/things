var path = require('path')
var assert = require('assert')
var app = require(path.join(__dirname, '../../../server/app'))
var config = require(path.join(__dirname, '../../../server/config'))
var jwt = require('koa-jwt')
var request = require('supertest').agent(app.listen())

describe('login API', function () {
  describe('login with wrong user name', function () {
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
        .send({username: 'test', password: 'password'})
        .expect(function (res) {
          assert.equal(res.body.status, 'success')
          assert.ok(res.body.token)
        })
        .expect(200, done)
    })
  })
})
