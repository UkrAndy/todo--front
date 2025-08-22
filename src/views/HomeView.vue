<template>
  <div class="home-view">
    <h2>
      {{ $t('app.name') }}<span v-if="auth.user">, {{ auth.user.name }}</span>
    </h2>
    <div v-if="auth.loading"><Loader /></div>
    <router-link v-if="!auth.loading" to="/todos">{{
      $t('todoList.mainMenuTitle')
    }}</router-link>
  </div>
</template>

<script setup>
import Loader from '../components/Loader.vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
</script>

<style scoped>
.home-view {
  max-width: 400px;
  margin: 2rem auto;
}
</style>
