<template>
  <div class="login-wrap">
    <el-card class="login-card" shadow="hover">
      <div class="header">
        <div class="logo">FIKA</div>
        <h2>欢迎登录</h2>
      </div>

      <el-form
        :model="form"
        :rules="rules"
        ref="formRef"
        label-position="top"
        class="login-form"
        @submit.native.prevent
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="手机号 / 用户名 / 邮箱"
            clearable
            prefix-icon="el-icon-user"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
            prefix-icon="el-icon-lock"
          />
        </el-form-item>

        <el-form-item>
          <div id="cf-turnstile"></div>
        </el-form-item>

        <el-form-item>
          <div class="row-between">
            <el-checkbox v-model="form.remember">记住我</el-checkbox>
            <a class="forgot" href="#" @click.prevent="onForgot">忘记密码？</a>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" size="medium" style="width:100%" @click="onSubmit">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { userAuthStore } from '@/store/auth'

const authStore = userAuthStore()
const router = useRouter()
const formRef = ref(null)
const form = ref({
  username: '',
  password: '',
  remember: true,
})
const loading = ref(false)

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

const cfTurnstileWidgetId = ref() // cf-turnstile组件的id

const onSubmit = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    try {
      await authStore.loginAction({
        username: form.value.username,
        password: form.value.password,
      })
      ElMessage({
        message: '登录成功！',
        type: 'success',
      })
      // router.push('/dashboard').catch(() => {})
    } catch (err) {
      console.error('登录失败', err)
    } finally {
      loading.value = false
    }
  })
}

const onForgot = () => {
  ElMessage.info('请联系管理员重置密码。')
}

onMounted(() => {
  // 渲染cf-turnstile
  loadTurnstile()
}) 

// 载入cloudflare turnstile 脚本
function loadTurnstile() {
  const script = document.createElement('script')
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
  script.async = true
  script.defer = true

  document.head.appendChild(script)

  script.onload = () => {
    cfTurnstileWidgetId.value = turnstile.render('#cf-turnstile', {
      sitekey: '0x4AAAAAABmZuLg8px1uBqfP',
      "retry-interval": 30000,
      callback: turnstileCallback,
      "expired-callback": turnstileExpiredCallback,
      size: 'flexible'
    })
  }
}
window.turnstileCallback = function (token) {
  console.log("turnstileCallback", token);
  
  btnDisabled.value = false
  cfCaptchaToken.value = token
}

window.turnstileExpiredCallback = function () {  
  btnDisabled.value = true
  cfCaptchaToken.value = ''
}
</script>

<style scoped>
.login-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #f6f8fb, #eef3fb);
}

.login-card {
  width: 420px;
  border-radius: 14px;
  padding: 28px;
  box-shadow: 0 10px 30px rgba(17, 24, 39, 0.08);
}

.header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.logo {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: linear-gradient(135deg, #3366ff, #4f7bff);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  box-shadow: 0 6px 18px rgba(51, 102, 255, 0.12);
}

.header h2 {
  margin: 0;
  font-size: 18px;
  color: #0f1724;
  font-weight: 600;
}

.login-form {
  margin-top: 6px;
}

.row-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.forgot {
  color: #6b7280;
  font-size: 13px;
  text-decoration: none;
}

.el-input__inner {
  border-radius: 8px;
  padding-left: 12px;
}

.el-button--primary {
  border-radius: 10px;
  height: 44px;
}
</style>