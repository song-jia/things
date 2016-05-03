export function addNewThing ({ dispatch }, payload) {
  dispatch('NEW_THING', payload)
}

export function removeThing ({ dispatch }, payload) {
  dispatch('REMOVE_THING', payload)
}

export function updateThing ({ dispatch }, payload) {
  dispatch('UPDATE_THING', payload)
}

export function addNewAction ({ dispatch }, payload) {
  dispatch('NEW_ACTION', payload)
}

export function removeAction ({ dispatch }, payload) {
  dispatch('REMOVE_ACTION', payload)
}

export function updateAction ({ dispatch }, payload) {
  dispatch('UPDATE_ACTION', payload)
}

export function addActionToToday ({ dispatch }, id) {
  var d = new Date()
  var dueDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  dispatch('UPDATE_ACTION', {id: id, dueDate: dueDate})
}
