<template>
  <button class="logout-btn" @click="logout">
    {{ $t('general.buttons.logout') }}
  </button>
</template>
<script setup>
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'
const auth = useAuthStore()
const router = useRouter()
function logout() {
  auth.logout()
  router.push('/login')
}
</script>
<style scoped>
.logout-btn {
  background: var(--color-accent);
  color: var(--color-card-bg);
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  font-size: 1em;
  box-shadow: 0 1px 4px 0 rgba(60, 60, 60, 0.08);
  transition: background 0.2s, color 0.2s;
}
.logout-btn:hover {
  background: color-mix(
    in srgb,
    var(--color-accent) 80%,
    var(--color-card-bg) 20%
  );
  color: var(--color-text);
}
</style>
