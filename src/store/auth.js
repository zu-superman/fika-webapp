import { defineStore } from 'pinia'
import { login, logout } from '@/api/auth'

export const userAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    async loginAction(credentials) {
      try {
        const user = await login(credentials)
        this.isAuthenticated = true
        this.user = user
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    async logoutAction() {
      await logout()
      this.isAuthenticated = false
      this.user = null
    },
  },
})