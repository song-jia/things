const path = require('path')
const server = require(path.join(__dirname, '../../../server/server'))
const request = require('supertest')(server)
const expect = require('chai').expect
const jwt = require('koa-jwt')
const config = require('../../config')
const db = require('../../utils/db')
const users = db.get('users')
const password = require('../../utils/password')
const stuffs = db.get('stuffs')
const monk = require('monk')

describe('stuffs API', () => {
  const userId = monk.id()
  const stuff1Id = monk.id()
  const stuff2Id = monk.id()
  const stuff3Id = monk.id()
  let token = jwt.sign({sub: userId, user: 'test', authID: 'auth_id_1'}, config.JWT_KEY, {expiresIn: '1h'})
  beforeEach(function () {
    return Promise.all([
      users.drop()
        .then(function () {
          return users.insert([
            {
              _id: userId,
              name: 'test',
              password: password.encrypt('111111'),
              loginRecord: [
                {id: 'auth_id_1'}
              ]
            }
          ])
        }),
      stuffs.drop()
        .then(() => stuffs.insert([
          {_id: stuff1Id, title: 'stuff 1', userId: userId},
          {_id: stuff2Id, title: 'stuff 2', userId: userId},
          {_id: stuff3Id, title: 'stuff 3', userId: '111111'}
        ])
        )
    ])
  })
  describe('get user\'s all stuffs', () => {
    it('should return list of stuffs in json.', () => {
      return request
        .get('/api/stuffs')
        .set({
          Authorization: `Bearer ${token}`
        })
        .then((res) => {
          expect(res.status).to.equal(200)
          expect(res.body).to.deep.equal([
            {_id: stuff1Id.toString(), title: 'stuff 1'},
            {_id: stuff2Id.toString(), title: 'stuff 2'}
          ])
        })
    })
  })
  describe('create new stuff.', () => {
    it('should create new stuff.', () => {
      return request
        .post('/api/stuffs')
        .set({
          Authorization: `Bearer ${token}`
        })
        .type('json')
        .send({title: 'new stuff test title'})
        .expect(200)
        .then(function (res) {
          expect(res.body.success).to.be.true
          return stuffs.find({title: 'new stuff test title'})
            .then((stuff) => {
              expect(stuff.length).to.equal(1)
              expect(stuff[0]._id.toString()).to.equal(res.body.id)
              expect(stuff[0].title).to.equal('new stuff test title')
              expect(stuff[0].userId).to.equal(userId.toString())
              expect(stuff[0].create_time).to.be.ok
            })
        })
    })
  })
})
