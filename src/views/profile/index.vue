<template>
  <div class="profile-container">
    <el-card class="profile-card">
      <template #header>
        <div class="card-header">
          <span>个人资料</span>
        </div>
      </template>

      <el-form :model="form" label-width="80px" style="max-width: 500px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" disabled />
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { userAuthStore } from '@/store/auth'

const authStore = userAuthStore()

const form = ref({
  username: authStore.user?.username || '',
  email: authStore.user?.email || '',
  phone: authStore.user?.phone || '',
})

function handleSave() {
  ElMessage.success('保存成功')
}

function handleReset() {
  form.value = {
    username: authStore.user?.username || '',
    email: authStore.user?.email || '',
    phone: authStore.user?.phone || '',
  }
}
</script>

<style scoped>
.profile-container {
  padding: 16px;
}

.profile-card {
  max-width: 600px;
}

.card-header {
  font-size: 16px;
  font-weight: 600;
}
</style>
