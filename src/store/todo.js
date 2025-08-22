import { defineStore } from 'pinia'
import axios from 'axios'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchTodos(token) {
      this.loading = true
      this.error = null
      try {
        const { data } = await axios.get('/api/todos', {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.todos = data.data || []
      } catch (e) {
        this.error = e.response?.data?.message || 'Failed to fetch todos'
      } finally {
        this.loading = false
      }
    },
    async createTodo(todo, token) {
      this.loading = true
      this.error = null
      try {
        await axios.post('/api/todos', todo, {
          headers: { Authorization: `Bearer ${token}` },
        })
        await this.fetchTodos(token)
      } catch (e) {
        this.error = e.response?.data?.message || 'Failed to create todo'
      } finally {
        this.loading = false
      }
    },
    async updateTodo(id, changedFields, token) {
      // Do not set this.loading = true here!
      this.error = null
      try {
        let config = { headers: { Authorization: `Bearer ${token}` } }
        if (changedFields instanceof FormData) {
          await axios.post(`/api/todos/${id}/file`, changedFields, config)
        } else {
          await axios.put(`/api/todos/${id}`, changedFields, config)
        }
        await this.fetchTodos(token)
      } catch (e) {
        this.error = e.response?.data?.message || 'Failed to update todo'
      }
    },
    async deleteTodo(id, token) {
      // Do not set this.loading = true here!
      this.error = null
      try {
        await axios.delete(`/api/todos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        await this.fetchTodos(token)
      } catch (e) {
        this.error = e.response?.data?.message || 'Failed to delete todo'
      }
    },
    clearStore() {
      this.todos = []
      this.loading = false
      this.error = null
    },
  },
})
