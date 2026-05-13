import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/utils/common-util'
import { usePermissionStore } from '@/layout/stores/permission'
import { constantRoutes } from './constant-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
})

router.beforeEach(async (to, from, next) => {
  const token = getToken()
  const permissionStore = usePermissionStore()

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else if (permissionStore.hasFetchedRoutes) {
      next()
    } else {
      try {
        await permissionStore.generateRoutes()
        next({ ...to, replace: true })
      } catch (error) {
        console.error('Failed to generate routes:', error)
        const { userAuthStore } = await import('@/store/auth')
        await userAuthStore().logoutAction()
        permissionStore.reset()
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    if (to.meta.requiresAuth !== false && to.path !== '/login') {
      next(`/login?redirect=${to.path}`)
    } else {
      next()
    }
  }
})

export default router
