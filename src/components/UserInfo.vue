<template>
  <span class="user-info">
    {{ auth.user?.name || $t('app.guest') }}
  </span>
</template>
<script setup>
import { useAuthStore } from '../store/auth'
const auth = useAuthStore()
</script>
<style scoped>
.user-info {
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  gap: 0.4em;
}
</style>
