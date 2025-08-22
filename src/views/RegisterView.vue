<template>
  <div class="register-view">
    <h2>{{ $t('register.mainMenuTitle') }}</h2>
    <div v-if="auth.loading"><Loader /></div>
    <form v-if="!auth.loading" @submit.prevent="onRegister">
      <div class="form-group">
        <label for="register-name">{{ $t('register.name') }}</label>
        <input
          id="register-name"
          v-model="name"
          type="text"
          required
          :placeholder="$t('register.name_placeholder')"
        />
      </div>
      <div class="form-group">
        <label for="register-email">{{ $t('register.email') }}</label>
        <input
          id="register-email"
          v-model="email"
          type="email"
          required
          :placeholder="$t('register.email_placeholder')"
        />
      </div>
      <div class="form-group">
        <label for="register-password">{{ $t('register.password') }}</label>
        <input
          id="register-password"
          v-model="password"
          type="password"
          required
          :placeholder="$t('register.password_placeholder')"
        />
      </div>
      <div class="form-group">
        <label for="register-password-confirm">{{
          $t('register.password_confirm')
        }}</label>
        <input
          id="register-password-confirm"
          v-model="password_confirmation"
          type="password"
          required
          :placeholder="$t('register.password_confirm_placeholder')"
        />
      </div>
      <button class="form-btn" :disabled="auth.loading">
        {{ $t('general.buttons.register') }}
      </button>
      <div v-if="auth.error" class="error">{{ auth.error }}</div>
    </form>
  </div>
</template>

<script setup>
import Loader from '../components/Loader.vue'
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')

const onRegister = async () => {
  await auth.register(
    name.value,
    email.value,
    password.value,
    password_confirmation.value
  )
  if (auth.isAuthenticated) {
    router.push({ name: 'Home' })
  }
}
</script>

<style scoped>
.register-view {
  max-width: 400px;
  margin: 2.5rem auto;
  background: var(--color-card-bg);
  border-radius: 14px;
  box-shadow: var(--color-card-shadow);
  padding: 2.5rem 2rem 2rem 2rem;
  color: var(--color-text);
}
.register-view h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-accent);
}
.form-group {
  margin-bottom: 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.form-group label {
  font-weight: 500;
  color: var(--color-text);
}
.form-group input {
  border-radius: 6px;
  border: 1.5px solid var(--color-btn-border);
  padding: 0.6rem 1rem;
  font-size: 1em;
  background: var(--color-btn-bg);
  color: var(--color-text);
  transition: border 0.2s, background 0.3s, color 0.3s;
}
.form-group input:focus {
  border-color: var(--color-accent);
  outline: none;
  background: var(--color-card-bg);
}
.form-btn {
  width: 100%;
  padding: 0.7rem 0;
  border-radius: 6px;
  border: none;
  background: var(--color-accent);
  color: var(--color-card-bg);
  font-weight: 600;
  font-size: 1.1em;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 1px 4px 0 rgba(60, 60, 60, 0.08);
}
.form-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.form-btn:hover:not(:disabled) {
  background: color-mix(
    in srgb,
    var(--color-accent) 80%,
    var(--color-card-bg) 20%
  );
  color: var(--color-text);
}
.error {
  color: #d32f2f;
  margin-top: 1rem;
  text-align: center;
}
</style>
