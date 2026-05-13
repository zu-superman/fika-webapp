<template>
  <div class="app-header">
    <el-dropdown trigger="hover" @command="handleCommand">
      <div class="avatar-wrapper">
        <el-avatar :size="28" :src="userAvatar" />
        <el-icon class="arrow-down"><ArrowDown /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="profile">个人资料</el-dropdown-item>
          <el-dropdown-item command="password">修改密码</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { userAuthStore } from '@/store/auth'
import { useTagsViewStore } from '@/layout/stores/tags-view'
import { usePermissionStore } from '@/layout/stores/permission'

const router = useRouter()
const authStore = userAuthStore()
const tagsViewStore = useTagsViewStore()
const permissionStore = usePermissionStore()

const userName = computed(() => authStore.user?.username || '用户')
const userAvatar = computed(() => authStore.user?.avatar || '')

function handleCommand(command) {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'password':
      ElMessage.info('修改密码功能待实现')
      break
    case 'logout':
      authStore.logoutAction().then(() => {
        permissionStore.reset()
        tagsViewStore.$reset()
        router.push('/login')
      })
      break
  }
}
</script>

<style scoped>
.app-header {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 16px;
  border-bottom: 1px solid #ebeef5;
  flex-shrink: 0;
  min-width: 80px;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.avatar-wrapper:hover {
  background-color: #f5f7fa;
}

.arrow-down {
  font-size: 12px;
  color: #909399;
}
</style>
