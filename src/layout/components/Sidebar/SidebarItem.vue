<template>
  <template v-if="!item.hidden">
    <el-menu-item v-if="isLeaf" :index="item.path.startsWith('/') ? item.path : '/' + basePath">
      <el-icon><component :is="item.icon || 'Document'" /></el-icon>
      <template #title>{{ item.title }}</template>
    </el-menu-item>

    <el-sub-menu v-else :index="item.path.startsWith('/') ? item.path : '/' + basePath">
      <template #title>
        <el-icon><component :is="item.icon || 'Folder'" /></el-icon>
        <span>{{ item.title }}</span>
      </template>
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="`${basePath}/${child.path}`"
      />
    </el-sub-menu>
  </template>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
  basePath: { type: String, default: '' },
})

const isLeaf = computed(() => !props.item.children || props.item.children.length === 0)
</script>
