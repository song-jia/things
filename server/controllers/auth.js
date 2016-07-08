
module.exports.get = function * get (next) {
  if (this.method !== 'GET') {
    return yield next
  }
  this.body = {
    message: 'you need to login first.'
  }
}
