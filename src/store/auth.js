import { defineStore } from 'pinia'
import { login, logout } from '@/api/auth'
import { setToken, removeToken } from '@/utils/common-util'

export const userAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    async loginAction(credentials) {
      try {
        const loginRes = await login(credentials)
        const user = loginRes.data
        this.isAuthenticated = true
        this.user = user
        setToken(user?.token)
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    async logoutAction() {
      await logout()
      this.isAuthenticated = false
      this.user = null
      removeToken()
    },
  },
})