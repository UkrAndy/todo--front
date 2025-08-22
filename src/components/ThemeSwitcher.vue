<template>
  <button
    class="theme-switcher"
    @click="toggleTheme"
    :aria-label="$t('app.theme')"
  >
    <transition name="theme-icon-slide" mode="out-in">
      <span v-if="theme === 'light'" key="moon" class="theme-icon">
        <img
          src="/src/assets/theme/moon.svg"
          alt="Dark theme"
          width="24"
          height="24"
        />
      </span>
      <span v-else key="sun" class="theme-icon">
        <img
          src="/src/assets/theme/sun.svg"
          alt="Light theme"
          width="24"
          height="24"
        />
      </span>
    </transition>
  </button>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
const theme = ref(
  localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light')
)

function applyTheme(val) {
  document.documentElement.setAttribute('data-theme', val)
  localStorage.setItem('theme', val)
}

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  applyTheme(theme.value)
}

applyTheme(theme.value)

// Sync theme across tabs
window.addEventListener('storage', (e) => {
  if (e.key === 'theme' && e.newValue) {
    theme.value = e.newValue
    applyTheme(e.newValue)
  }
})
</script>

<style scoped>
.theme-switcher {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  outline: none;
  color: var(--color-accent);
}
.theme-switcher:focus {
  outline: none;
  box-shadow: none;
}
.theme-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.theme-icon-slide-enter-active,
.theme-icon-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 2, 0.6, 1);
}
.theme-icon-slide-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.theme-icon-slide-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}
</style>
