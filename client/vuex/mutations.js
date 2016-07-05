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
    priority: '',
    actions: []
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

export function NEW_ACTION (state, payload) {
  var addDate = new Date()
  var aId = 'a_' + addDate.getTime()
  var newAction = {
    id: aId,
    title: payload.title,
    dueDate: payload.dueDate,
    createdDate: String(addDate.getTime()),
    refThing: payload.thingId,
    startTime: 0,
    status: '',
    usageTime: []
  }
  // save action data to store
  state.actions = {
    ...state.actions,
    [aId]: newAction
  }
  // link action to thing
  state.things[payload.thingId].actions.push(aId)
}

export function REMOVE_ACTION (state, payload) {
  var refThing = state.actions[payload.id]['refThing']
  // delete action data
  delete state.actions[payload.id]
  state.actions = {...state.actions}
  // delete action ref from thing's action list
  var actions = state.things[refThing]['actions']
  for (let i = 0; i < actions.length; i++) {
    if (actions[i] === payload.id) {
      actions.splice(i, 1)
    }
  }
  state.things = {...state.things}
}

export function UPDATE_ACTION (state, payload) {
  if (!state.actions.hasOwnProperty(payload.id)) {
    return false
  }
  Object.assign(state.actions[payload.id], payload)
  state.actions = {...state.actions}
}

export function ADD_TO_TODAY (state, payload) {
  if (state.todayActions.indexOf(payload['id']) === -1) {
    state.todayActions.push(payload['id'])
  }
}

export function REMOVE_FROM_TODAY (state, payload) {
  var index = state.todayActions.indexOf(payload['id'])
  if (index === -1) {
    return false
  }
  var todoActions = state.todayActions.slice(0) // clone array
  todoActions.splice(index, 1) // remove action
  state.todayActions = todoActions
  return true
}
