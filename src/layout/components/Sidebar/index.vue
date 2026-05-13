<template>
  <div class="sidebar-container" :class="{ 'is-collapsed': settingsStore.sidebarCollapsed }">
    <div class="sidebar-logo">
      <router-link to="/">
        <div class="logo-icon">FIKA</div>
        <h1 v-show="!settingsStore.sidebarCollapsed" class="logo-title">Fika Admin</h1>
      </router-link>
    </div>

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="settingsStore.sidebarCollapsed"
        :collapse-transition="false"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        router
      >
        <SidebarItem
          v-for="item in permissionStore.menuList"
          :key="item.path"
          :item="item"
          :base-path="item.path"
        />
      </el-menu>
    </el-scrollbar>

    <div class="sidebar-footer">
      <el-button link @click="settingsStore.toggleSidebar" class="collapse-btn">
        <el-icon><component :is="settingsStore.sidebarCollapsed ? 'Expand' : 'Fold'" /></el-icon>
        <span v-show="!settingsStore.sidebarCollapsed">收起</span>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingsStore } from '@/layout/stores/settings'
import { usePermissionStore } from '@/layout/stores/permission'
import SidebarItem from './SidebarItem.vue'

const route = useRoute()
const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()

const activeMenu = computed(() => route.path)
</script>

<style scoped>
.sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 210px;
  background-color: #304156;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  transition: width 0.3s;
  z-index: 10;
}

.is-collapsed {
  width: 64px;
}

.sidebar-logo {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #1f2d3d;
}

.sidebar-logo a {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  overflow: hidden;
}

.logo-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: linear-gradient(135deg, #3366ff, #4f7bff);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  flex-shrink: 0;
}

.logo-title {
  margin: 0;
  font-size: 16px;
  color: #fff;
  white-space: nowrap;
}

.sidebar-footer {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #1f2d3d;
}

.collapse-btn {
  color: #bfcbd9;
  width: 100%;
}

.collapse-btn:hover {
  color: #409EFF;
}
</style>
