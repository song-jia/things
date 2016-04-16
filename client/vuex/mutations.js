/*
 * @param Object payload {
 *    title: '',
 *    // dueDateType can be 4 optional value:
 *    // none: no due date
 *    // day: a specified day
 *    // time: a specified time
 *    // period: a period of day
 *    dueDateType: '',
 *    // none: null
 *    // day: '2016-4-13'
 *    // time: '2016-4-13 20:00'
 *    // period: object {from: '2016-4-13', to: '2016-6-1'}
 *    dueDate: ''
 * }
 */
export function NEW_THING (state, payload) {
  var createdTime = (new Date()).getTime()
  var id = 't_' + createdTime
  var newThing = {
    id: id,
    title: payload.title,
    dueDateType: payload.dueDateType,
    dueDate: payload.dueDate,
    complete: false,
    createdDate: createdTime,
    priority: ''
  }
  state.things = {
    ...state.things,
    [id]: newThing
  }
}
/*
* remove a thing record.
*/
export function REMOVE_THING (state, payload) {
  delete state.things[payload.id]
  state.things = {...state.things}
}
/*
* update a thing record.
*/
export function UPDATE_THING (state, payload) {
  // do nothing if id is not exist.
  if (!state.things.hasOwnProperty(payload.id)) {
    return false
  }
  Object.assign(state.things[payload.id], payload)
  state.things = {...state.things}
}
