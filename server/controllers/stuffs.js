const db = require('../utils/db')
const stuffsRepo = db.get('stuffs')
const monk = require('monk')

module.exports.all = async (ctx) => {
  let stuffs = await stuffsRepo.find({userId: monk.id(ctx.state.user.sub)}, ['_id', 'title'])
  ctx.response.status = 200
  ctx.response.body = stuffs
}

module.exports.new = async (ctx) => {
  if (!objectHasProperties(ctx.request.body, ['title'])) {
    ctx.response.status = 200
    ctx.response.body = {
      success: false,
      errorMessage: 'required field is missed.'
    }
    return true
  }
  let result = await stuffsRepo.insert(
    {userId: ctx.state.user.sub, title: ctx.request.body.title, 'create_time': Date.now()}
  )
  ctx.response.status = 200
  ctx.response.body = {
    success: true,
    id: result._id
  }
}

module.exports.update = async (ctx) => {
  if (!objectHasProperties(ctx.request.body, ['id', 'title'])) {
    ctx.response.status = 200
    ctx.response.body = {
      success: false,
      errorMessage: 'required field is missed.'
    }
    return true
  }
  let updated = await stuffsRepo.update(
    {_id: monk.id(ctx.request.body.id), userId: monk.id(ctx.state.user.sub)},
    {title: ctx.request.body.title, update_time: Date.now()}
  )
  ctx.response.status = 200
  if (updated.n === 0) {
    ctx.response.body = {
      success: false,
      errorMessage: 'id is invalid.'
    }
  } else {
    ctx.response.body = {
      success: true
    }
  }
}

module.exports.remove = async (ctx) => {
  if (ctx.request.body.id) {
    await stuffsRepo.remove({_id: monk.id(ctx.request.body.id), userId: monk.id(ctx.state.user.sub)})
  }
  ctx.response.status = 200
  ctx.response.body = {
    success: true
  }
}

function objectHasProperties (obj = {}, properties = []) {
  return properties.reduce(
    (result, property) => result && obj.hasOwnProperty(property),
    true
  )
}
