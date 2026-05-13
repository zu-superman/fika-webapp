import { defineStore } from 'pinia'
import { getMenuRoutes } from '@/api/menu'
import router from '@/router'
const Layout = () => import('@/layout/index.vue')
import { convertBackendMenusToRoutes } from '@/layout/utils/route-convert'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    menuList: [],
    hasFetchedRoutes: false,
  }),
  actions: {
    async generateRoutes() {
      let backendMenus = []
      try {
        const res = await getMenuRoutes()
        backendMenus = res.data || []
      } catch (error) {
        // Backend menu API may not be available; use fallback
        console.warn('Failed to fetch menu routes, using fallback:', error)
      }

      this.menuList = backendMenus

      let dynamicRoutes
      if (backendMenus.length === 0) {
        // Fallback: add a default dashboard route when no backend menu is returned
        dynamicRoutes = [
          {
            path: '/',
            component: Layout,
            redirect: '/dashboard',
            children: [
              {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                meta: { title: 'Dashboard', icon: 'House', affix: true },
              },
            ],
          },
        ]
        // Fallback menu list for sidebar rendering
        this.menuList = [
          {
            path: '/dashboard',
            name: 'Dashboard',
            title: '仪表盘',
            icon: 'House',
            children: [],
          },
        ]
      } else {
        dynamicRoutes = convertBackendMenusToRoutes(backendMenus, Layout)
      }

      // Add 404 catch-all as the last route
      dynamicRoutes.push({
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        meta: { hidden: true },
      })

      dynamicRoutes.forEach(route => {
        router.addRoute(route)
      })

      this.hasFetchedRoutes = true
    },
    reset() {
      this.menuList = []
      this.hasFetchedRoutes = false
    },
  },
})
