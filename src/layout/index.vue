<template>
  <div class="app-wrapper" :class="{ 'sidebar-collapsed': settingsStore.sidebarCollapsed }">
    <Sidebar />
    <div class="main-container">
      <div class="header-area">
        <TagsView />
        <AppHeader />
      </div>
      <section class="app-main">
        <router-view v-slot="{ Component, route }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="tagsViewStore.cachedViews">
              <component :is="Component" :key="route.path" />
            </keep-alive>
          </transition>
        </router-view>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useSettingsStore } from '@/layout/stores/settings'
import { useTagsViewStore } from '@/layout/stores/tags-view'
import Sidebar from '@/layout/components/Sidebar/index.vue'
import TagsView from '@/layout/components/TagsView/index.vue'
import AppHeader from '@/layout/components/AppHeader.vue'

const settingsStore = useSettingsStore()
const tagsViewStore = useTagsViewStore()
</script>

<style scoped>
.app-wrapper {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 210px;
  transition: margin-left 0.3s;
}

.sidebar-collapsed .main-container {
  margin-left: 64px;
}

.header-area {
  position: sticky;
  top: 0;
  z-index: 9;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: stretch;
}

.app-main {
  flex: 1;
  background: #f0f2f5;
  overflow-y: auto;
}

/* Page transition */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
