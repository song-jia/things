const password = require('../server/utils/password')
const db = require('../server/utils/db')
const users = db.get('users')

users.findOne({name: 'text'}).then(function (user) {
 console.log(user)
})

Promise.all([
  users.drop() // 删除users collection
    .then(function () { // 添加user documents
      return users.insert(
        [
          {name: 'jsong', password: password.encrypt('111111')},
          {name: 'test', password: password.encrypt('111111')}
        ]
      )
    })
])
.then(function () {
  db.close() // 关闭数据库链接
}).catch(onError)

function onError (e) {
  console.log(e)
}
