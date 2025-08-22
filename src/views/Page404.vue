<template>
  <div class="page404-view">
    <h1>404</h1>

    <div class="page404-message">{{ $t('general.page404') }}</div>

    <router-link to="/" class="page404-link">{{
      $t('general.toMain')
    }}</router-link>
  </div>
</template>

<script setup>
import emptyTasksSvg from '../assets/empty-tasks.svg'
</script>

<style scoped>
.page404-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}
.page404-message {
  font-size: 1.3rem;
  color: #888;
  margin-bottom: 1.2rem;
}
.page404-svg {
  width: 160px;
  height: 160px;
  opacity: 0.7;
  margin-bottom: 1.5rem;
}
.page404-link {
  color: #3b82f6;
  text-decoration: underline;
  font-size: 1.1rem;
}
</style>
