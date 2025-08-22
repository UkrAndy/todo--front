<template>
  <div class="user-section">
    <template v-if="auth.isAuthenticated">
      <UserInfo />
      <LogoutButton />
    </template>
    <template v-else>
      <LoginButtons />
    </template>
  </div>
</template>

<script setup>
import { useAuthStore } from '../store/auth'
import UserInfo from './UserInfo.vue'
import LogoutButton from './LogoutButton.vue'
import LoginButtons from './LoginButtons.vue'
const auth = useAuthStore()
</script>

<style scoped>
.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-text);
}
</style>
