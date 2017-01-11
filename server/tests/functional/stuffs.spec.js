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

describe('stuffs', () => {
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
})
