<template>
  <nav class="main-menu">
    <router-link
      v-for="route in mainMenuRoutes"
      :key="route.path"
      :to="route.path"
      class="menu-link"
    >
      <template v-if="route.name === 'Home'">
        {{ $t('home.mainMenuTitle') }}
      </template>
      <template v-else-if="route.name === 'Todos'">
        {{ $t('todoList.mainMenuTitle') }}
      </template>
      <template v-else>
        {{ $t('general.navigationLinks.' + route.name.toLowerCase()) }}
      </template>
    </router-link>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { computed } from 'vue'
const router = useRouter()
const auth = useAuthStore()
const mainMenuRoutes = computed(() => {
  if (auth.isAuthenticated) {
    return router.options.routes.filter(
      (r) => r.name === 'Home' || r.name === 'Todos'
    )
  } else {
    return router.options.routes.filter((r) => r.name === 'Home')
  }
})
</script>

<style scoped>
.main-menu {
  display: flex;
  gap: 1rem;
  flex: 1 1 auto;
  min-width: 0;
  padding: 1rem 2rem;
  width: 100%;
}
.menu-link {
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  transition: color 0.2s;
}
.menu-link.router-link-exact-active {
  color: var(--color-accent);
}
</style>
