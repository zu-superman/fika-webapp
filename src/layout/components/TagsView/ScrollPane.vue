<template>
  <el-scrollbar ref="scrollbarRef" class="scroll-container" @wheel.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const scrollbarRef = ref(null)

function handleScroll(e) {
  const wrap$ = scrollbarRef.value?.wrapRef
  if (!wrap$) return
  const delta = e.deltaY * 3
  wrap$.scrollLeft += delta
}

watch(
  () => route.path,
  () => {
    nextTick(() => {
      const activeTag = document.querySelector('.tags-view-item.active')
      if (!activeTag) return
      const wrap$ = scrollbarRef.value?.wrapRef
      if (!wrap$) return
      const tagLeft = activeTag.offsetLeft
      const tagWidth = activeTag.offsetWidth
      const wrapWidth = wrap$.offsetWidth

      if (tagLeft + tagWidth > wrapWidth + wrap$.scrollLeft) {
        wrap$.scrollLeft = tagLeft + tagWidth - wrapWidth + 4
      } else if (tagLeft < wrap$.scrollLeft) {
        wrap$.scrollLeft = tagLeft - 4
      }
    })
  }
)
</script>

<style scoped>
.scroll-container {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
}

:deep(.el-scrollbar__bar.is-vertical) {
  display: none;
}
</style>
