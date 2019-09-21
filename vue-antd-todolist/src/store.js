import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuItems: [],
    finishItems: [],
    currentUser: null,
    isLogin: false
  },

  mutations: {
    pushToMenuItems(state, values) {
      state.menuItems.unshift(values)
      // state.menuItems = values 
    },
    pushToFinishItems(state, values) {
      state.finishItems.push(values)
    },
    //更改用户状态信息
    userStatus(state, user) {
      if (user) {
        state.currentUser = user
        state.isLogin = true
      } else {
        state.currentUser = null
        state.isLogin = false
      }
    }
  },
  actions: {
    setUser({ commit }, user){
      commit('userStatus', user)
    }
  }
})
