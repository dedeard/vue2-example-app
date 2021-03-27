import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import { SET_BOOT_LOADING } from './mutation.types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bootLoading: true,
  },
  mutations: {
    [SET_BOOT_LOADING](state, payload) {
      state.bootLoading = !!payload
    },
  },
  modules: {
    auth,
  },
})
