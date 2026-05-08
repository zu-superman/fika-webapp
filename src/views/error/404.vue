<template>
  <el-result title="页面丢失" :sub-title="subTitle">
    <template #icon>
      <el-image class="logo-container"
        :src="logo"
        fit="contain"
      />
    </template>
    <template #extra>
      <el-button type="primary">回到上一级</el-button>
    </template>
  </el-result>
</template>

<script setup>
import logo from '@/assets/404-logo.svg'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const countDown = ref(5);
const subTitle = computed(() => {
  return `页面不存在，${countDown.value} 秒后自动返回首页...`
});

let timer = null;

onMounted(() => { 
  timer = setInterval(() => {
    if (countDown.value > 0) {
      countDown.value--;
    } else {
      clearInterval(timer);
      router.push('/');
    }
  }, 1000);
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

</script>

<style scoped>
.logo-container {
  width: 100vw;
  height: 50vh;
}
</style>