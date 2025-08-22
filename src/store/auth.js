import { defineStore } from 'pinia'
import axios from 'axios'
import { useTodoStore } from './todo'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null,
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const { data } = await axios.post('/api/login', { email, password })
        this.token = data.token
        localStorage.setItem('token', data.token)
        await this.fetchUser()
      } catch (e) {
        this.error = e.response?.data?.message || 'Login failed'
      } finally {
        this.loading = false
      }
    },
    async register(name, email, password, password_confirmation) {
      this.loading = true
      this.error = null
      try {
        await axios.post('/api/register', {
          name,
          email,
          password,
          password_confirmation,
        })
        await this.login(email, password)
      } catch (e) {
        this.error = e.response?.data?.message || 'Registration failed'
      } finally {
        this.loading = false
      }
    },
    async fetchUser() {
      try {
        const { data } = await axios.get('/api/user', {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        this.user = data
      } catch (e) {
        this.logout()
      }
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      // Очищення todo store
      const todoStore = useTodoStore()
      todoStore.clearStore()
    },
  },
})
