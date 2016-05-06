export const getThingsList = function (state) {
  return state.things
}

export const todayActionsCount = function (state) {
  var todayDate = new Date()
  var today = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate()
  var count = 0
  for (let key in state.actions) {
    if (state.actions[key].dueDate === today) {
      count++
    }
  }
  return count
}
