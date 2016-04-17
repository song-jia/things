import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'

Vue.use(Vuex)

// init state of app
const state = {
  things: {},
  actions: {}
}

export default new Vuex.Store({
  state,
  mutations
})
