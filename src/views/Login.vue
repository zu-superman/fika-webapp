<template>
  <div class="login-container">
    <h1>{{ title }}</h1>
    <LoginForm />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref(import.meta.env.VITE_APP_TITLE)
</script>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
  components: {
    LoginForm
  },
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>