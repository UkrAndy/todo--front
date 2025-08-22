<template>
  <div class="lang-switcher">
    <div class="lang-dropdown" @click.stop="toggleLangDropdown">
      <span class="lang-flag">
        <img
          v-if="localeVal === 'ua'"
          src="/src/assets/flags/flag-ua.svg"
          alt="UA"
          width="22"
          height="16"
        />
        <img
          v-else-if="localeVal === 'en'"
          src="/src/assets/flags/flag-us.svg"
          alt="EN"
          width="22"
          height="16"
        />
      </span>

      <ul v-if="showLangDropdown" class="lang-list">
        <li
          v-for="l in langs"
          :key="l"
          @click.stop="selectLang(l)"
          :class="{ active: localeVal === l }"
        >
          <span class="lang-flag">
            <img
              v-if="l === 'ua'"
              src="/src/assets/flags/flag-ua.svg"
              alt="UA"
              width="22"
              height="16"
            />
            <img
              v-else-if="l === 'en'"
              src="/src/assets/flags/flag-us.svg"
              alt="EN"
              width="22"
              height="16"
            />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '../locales/i18n'
const { locale } = useI18n()
const langs = ['ua', 'en']
const showLangDropdown = ref(false)
const localeVal = computed(() =>
  typeof locale === 'string' ? locale : locale.value
)
function toggleLangDropdown() {
  showLangDropdown.value = !showLangDropdown.value
}
function selectLang(l) {
  setLocale(l)
  showLangDropdown.value = false
}
document.addEventListener('click', () => {
  showLangDropdown.value = false
})
</script>

<style scoped>
.lang-switcher {
  margin-left: 2rem;
  position: relative;
  z-index: 20;
}
.lang-dropdown {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  background: transparent;
  border-radius: 0;
  padding: 0;
  font-weight: 600;
  cursor: pointer;
  color: var(--color-accent);
  user-select: none;
  min-width: 0;
  position: relative;
}
.lang-flag {
  width: 22px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 6px;
  margin: 0;
  box-sizing: content-box;
}
.lang-caret {
  font-size: 0.8em;
  margin-left: 0.3em;
}
.lang-list {
  position: absolute;
  top: 110%;
  left: 0;
  background: var(--color-card-bg);
  border: 1px solid var(--color-btn-border);
  border-radius: 6px;
  box-shadow: var(--color-header-shadow);
  min-width: 100%;
  padding: 0.2rem 0;
  margin: 0;
  list-style: none;
  z-index: 100;
}
.lang-list li {
  padding: 0.2rem 0.3rem;
  min-width: 28px;
  max-width: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent);
  font-weight: 500;
  background: var(--color-card-bg);
  transition: background 0.2s, color 0.2s;
}
.lang-list li.active,
.lang-list li:hover {
  background: var(--color-accent);
  color: var(--color-card-bg);
}
</style>
