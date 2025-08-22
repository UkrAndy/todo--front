<template>
  <div class="main-layout">
    <Loader v-if="isLoading" />
    <slot />
  </div>
</template>

<script setup>
import Loader from '../components/Loader.vue'
import { computed } from 'vue'
import { useTodoStore } from '../store/todo'
import { useAuthStore } from '../store/auth'

const todoStore = useTodoStore()
const authStore = useAuthStore()

const isLoading = computed(() => todoStore.loading || authStore.loading)
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  width: 100vw;
  position: relative;
}
</style>
