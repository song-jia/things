export function addNewThing ({ dispatch }, payload) {
  dispatch('NEW_THING', payload)
}

export function removeThing ({ dispatch }, payload) {
  dispatch('REMOVE_THING', payload)
}
