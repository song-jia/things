const db = require('../utils/db')
const stuffsRepo = db.get('stuffs')
const monk = require('monk')

module.exports.all = async (ctx) => {
  let stuffs = await stuffsRepo.find({userId: monk.id(ctx.state.user.sub)}, ['_id', 'title'])
  ctx.response.status = 200
  ctx.response.body = stuffs
}
