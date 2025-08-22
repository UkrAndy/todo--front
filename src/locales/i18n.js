import { createI18n } from 'vue-i18n'
import en from './en.json'
import ua from './ua.json'

const getLocale = () => {
  return localStorage.getItem('locale') || 'ua'
}

export const i18n = createI18n({
  legacy: false,
  locale: getLocale(),
  fallbackLocale: 'ua',
  messages: {
    en,
    ua,
  },
})

export function setLocale(locale) {
  localStorage.setItem('locale', locale)
  i18n.global.locale.value = locale
}

// Listen for localStorage changes in other tabs
window.addEventListener('storage', (e) => {
  if (e.key === 'locale') {
    i18n.global.locale.value = e.newValue || 'ua'
  }
})
