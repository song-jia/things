export function NEW_THING (state, payload) {
  var createdTime = (new Date()).getTime()
  var newThing = {
    title: payload.title,
    createdDate: createdTime
  }
  var id = 't_' + createdTime
  state.things = {
    ...state.things,
    [id]: newThing
  }
}
