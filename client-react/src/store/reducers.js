import { combineReducers } from 'redux'
import locationReducer from './location'
import authenticationReducer from './authentication'
import itemsReducer from './items'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers(Object.assign(
    {
      location: locationReducer,
      authentication: authenticationReducer,
      items: itemsReducer
    },
    asyncReducers
  ))
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
