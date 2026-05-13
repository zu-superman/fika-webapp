import { defineStore } from 'pinia'
import cache from '@/utils/cache'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    sidebarCollapsed: cache.local.getJSON('sidebarCollapsed') || false,
  }),
  actions: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
      cache.local.setJSON('sidebarCollapsed', this.sidebarCollapsed)
    },
  },
})
