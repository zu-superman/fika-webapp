import { createStore } from 'vuex'

const store = createStore({
  state: {
    isAuthenticated: false,
    user: null,
  },
  mutations: {
    login(state, user) {
      state.isAuthenticated = true
      state.user = user
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
    },
  },
  actions: {
    async login({ commit }, credentials) {
      // Call the API to log in the user
      const user = await authApi.login(credentials)
      commit('login', user)
    },
    logout({ commit }) {
      commit('logout')
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
  },
})

export default store