var path = require('path')
var app = require(path.join(__dirname, '../../../server/app'))
var config = require(path.join(__dirname, '../../../server/config'))
var jwt = require('koa-jwt')

var request = require('supertest').agent(app.listen())

describe('Basic Authentication', function () {
  describe('access any API with no credentials', function () {
    it('should throw 401', function (done) {
      request
        .get('/api')
        .expect(401, 'permission denied.', done)
    })
  })
  describe('access any API with invalid credentials', function () {
    it('should throw 401', function (done) {
      request
        .get('/api')
        .set('Authorization', 'wrong')
        .expect(401, 'permission denied.', done)
    })
  })
  describe('access any API with valid credentials', function () {
    it('should call next middleware', function (done) {
      var token = jwt.sign({user: 'id'}, config.JWT_KEY)
      request
        .get('/api')
        .set('Authorization', 'bearer ' + token)
        .expect(200, done)
    })
  })
})
