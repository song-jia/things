export const getThingsList = function (state) {
  return state.things
}

export const getTodayActions = function (state) {
  var todayActions = []
  var todaysDate = new Date()
  for (let key in state.actions) {
    let action = state.actions[key]
    if (!action.dueDate) {
      continue
    }
    let dueDate = new Date(action['dueDate'])
    if (todaysDate.setHours(0, 0, 0, 0) === dueDate.setHours(0, 0, 0, 0)) {
      todayActions.push(key)
    }
  }
  return todayActions
}
