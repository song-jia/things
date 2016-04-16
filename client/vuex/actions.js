export function addNewThing ({ dispatch }, payload) {
  dispatch('NEW_THING', payload)
}

export function removeThing ({ dispatch }, payload) {
  dispatch('REMOVE_THING', payload)
}

export function updateThing ({ dispatch }, payload) {
  dispatch('UPDATE_THING', payload)
}
