<template>
  <div class="tags-view-container">
    <ScrollPane ref="scrollPaneRef">
      <router-link
        v-for="tag in tagsViewStore.visitedViews"
        :key="tag.path"
        :to="{ path: tag.path, query: tag.query }"
        class="tags-view-item"
        :class="{ active: isActive(tag) }"
        @contextmenu.prevent="openContextMenu($event, tag)"
      >
        {{ tag.title }}
        <el-icon
          v-if="!isAffix(tag)"
          class="close-icon"
          @click.prevent.stop="closeTab(tag)"
        >
          <Close />
        </el-icon>
      </router-link>
    </ScrollPane>

    <ul
      v-show="contextMenuVisible"
      :style="{ left: contextMenuLeft + 'px', top: contextMenuTop + 'px' }"
      class="contextmenu"
    >
      <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeLeftTags">关闭左侧</li>
      <li @click="closeRightTags">关闭右侧</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTagsViewStore } from '@/layout/stores/tags-view'
import ScrollPane from './ScrollPane.vue'

const route = useRoute()
const router = useRouter()
const tagsViewStore = useTagsViewStore()

const contextMenuVisible = ref(false)
const contextMenuLeft = ref(0)
const contextMenuTop = ref(0)
const selectedTag = ref({})

function isActive(tag) {
  return tag.path === route.path
}

function isAffix(tag) {
  return tag.meta?.affix
}

function closeTab(tag) {
  tagsViewStore.delView(tag).then(() => {
    if (isActive(tag)) {
      const lastTag = tagsViewStore.visitedViews[tagsViewStore.visitedViews.length - 1]
      if (lastTag) router.push(lastTag.fullPath)
    }
  })
}

function closeSelectedTag(tag) {
  closeTab(tag)
  hideContextMenu()
}

function closeOthersTags() {
  tagsViewStore.delOthersViews(selectedTag.value)
  if (!isActive(selectedTag.value)) {
    router.push(selectedTag.value.fullPath)
  }
  hideContextMenu()
}

function closeLeftTags() {
  tagsViewStore.delLeftViews(selectedTag.value)
  hideContextMenu()
}

function closeRightTags() {
  tagsViewStore.delRightViews(selectedTag.value)
  hideContextMenu()
}

function closeAllTags() {
  tagsViewStore.delAllViews()
  const affixTag = tagsViewStore.visitedViews[0]
  router.push(affixTag?.fullPath || '/')
  hideContextMenu()
}

function openContextMenu(e, tag) {
  selectedTag.value = tag
  contextMenuLeft.value = e.clientX
  contextMenuTop.value = e.clientY
  contextMenuVisible.value = true
}

function hideContextMenu() {
  contextMenuVisible.value = false
}

watch(
  () => route.path,
  () => {
    if (route.name) {
      tagsViewStore.addView(route)
    }
  },
  { immediate: true }
)

onMounted(() => {
  document.addEventListener('click', hideContextMenu)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', hideContextMenu)
})
</script>

<style scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
}

.tags-view-item {
  display: inline-block;
  height: 26px;
  line-height: 26px;
  padding: 0 8px;
  font-size: 12px;
  color: #495060;
  border: 1px solid #d8dce5;
  border-radius: 3px;
  margin-left: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
}

.tags-view-item:first-child {
  margin-left: 12px;
}

.tags-view-item.active {
  background-color: #409EFF;
  color: #fff;
  border-color: #409EFF;
}

.close-icon {
  width: 12px;
  height: 12px;
  vertical-align: middle;
  border-radius: 50%;
  margin-left: 4px;
  transition: all 0.2s;
}

.close-icon:hover {
  background-color: #b4bccc;
  color: #fff;
}

.contextmenu {
  position: fixed;
  z-index: 3000;
  list-style: none;
  margin: 0;
  padding: 5px 0;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.contextmenu li {
  padding: 7px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
}

.contextmenu li:hover {
  background: #f5f7fa;
}
</style>
