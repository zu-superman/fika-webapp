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
      try {
        await logout()
      } catch (e) {
        // ignore logout API errors
      }
      this.isAuthenticated = false
      this.user = null
      removeToken()

      const { usePermissionStore } = await import('@/layout/stores/permission')
      const { useTagsViewStore } = await import('@/layout/stores/tags-view')
      usePermissionStore().reset()
      useTagsViewStore().$reset()
    },
  },
})
