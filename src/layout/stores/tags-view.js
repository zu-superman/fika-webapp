import { defineStore } from 'pinia'

export const useTagsViewStore = defineStore('tagsView', {
  state: () => ({
    visitedViews: [],
    cachedViews: [],
  }),
  actions: {
    addView(view) {
      this.addVisitedView(view)
      this.addCachedView(view)
    },
    addVisitedView(view) {
      if (this.visitedViews.some(v => v.path === view.path)) return
      this.visitedViews.push({
        path: view.path,
        name: view.name,
        title: view.meta?.title || '未命名',
        fullPath: view.fullPath,
        meta: { ...view.meta },
      })
    },
    addCachedView(view) {
      if (!view.name) return
      if (this.cachedViews.includes(view.name)) return
      this.cachedViews.push(view.name)
    },
    delView(view) {
      return new Promise(resolve => {
        this.delVisitedView(view)
        this.delCachedView(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        })
      })
    },
    delVisitedView(view) {
      this.visitedViews = this.visitedViews.filter(v => v.path !== view.path)
    },
    delCachedView(view) {
      const idx = this.cachedViews.indexOf(view.name)
      if (idx > -1) this.cachedViews.splice(idx, 1)
    },
    delOthersViews(view) {
      this.visitedViews = this.visitedViews.filter(v => v.path === view.path || v.meta?.affix)
      this.cachedViews = this.cachedViews.filter(name => {
        return this.visitedViews.some(v => v.name === name)
      })
    },
    delAllViews() {
      this.visitedViews = this.visitedViews.filter(v => v.meta?.affix)
      this.cachedViews = []
    },
    delLeftViews(view) {
      const idx = this.visitedViews.findIndex(v => v.path === view.path)
      this.visitedViews = this.visitedViews.filter((v, i) => i >= idx || v.meta?.affix)
      this.cachedViews = this.cachedViews.filter(name => {
        return this.visitedViews.some(v => v.name === name)
      })
    },
    delRightViews(view) {
      const idx = this.visitedViews.findIndex(v => v.path === view.path)
      this.visitedViews = this.visitedViews.filter((v, i) => i <= idx || v.meta?.affix)
      this.cachedViews = this.cachedViews.filter(name => {
        return this.visitedViews.some(v => v.name === name)
      })
    },
  },
})
