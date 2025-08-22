<template>
  <div class="todo-list-view">
    <div class="todo-list-header-row">
      <h2>{{ $t('todoList.mainMenuTitle') }}</h2>
      <button class="add-btn" @click="goToCreate">
        {{ $t('todoList.create') }}
      </button>
    </div>
    <div v-if="todoStore.loading"><Loader /></div>
    <div v-if="todoStore.error" class="error">
      {{ $t('general.error') }}: {{ todoStore.error }}
    </div>
    <div
      v-if="
        todoStore.todos.length === 0 && !todoStore.loading && !todoStore.error
      "
      class="empty-tasks-block"
    >
      <div class="empty-tasks-message">
        {{ $t('todoList.emptyMessage') }}
      </div>
      <img
        :src="emptyTasksSvg"
        alt="Empty tasks"
        class="empty-tasks-svg"
        style="margin-top: 1.2rem"
      />
    </div>
    <div v-else>
      <div class="todo-header-row">
        <div class="todo-img-wrap">{{ $t('todoList.image') }}</div>
        <div class="todo-title">{{ $t('todoList.name') }}</div>
        <div class="todo-priority">{{ $t('todoList.priority') }}</div>
        <div class="todo-status">{{ $t('todoList.status') }}</div>
        <div class="todo-actions">{{ $t('todoList.actions') }}</div>
      </div>
      <ul class="todo-list-ul">
        <TodoItem
          v-for="(todo, idx) in todoStore.todos"
          :key="todo.id"
          :todo="todo"
          :noImage="noImage"
          :even="idx % 2 === 0"
          :odd="idx % 2 === 1"
          @delete="askDelete(todo)"
          @status-change="updateStatus"
        />
      </ul>
    </div>
    <ConfirmDialog
      v-if="confirmDialog.open"
      :title="$t('general.confirm.title')"
      :message="$t('general.confirm.message', { name: confirmDialog.todoName })"
      @confirm="confirmDelete"
      @cancel="closeConfirm"
    />
  </div>
</template>

<script setup>
import { useTodoStore } from '../store/todo'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import TodoItem from '../components/TodoItem.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import emptyTasksSvg from '../assets/empty-tasks.svg'
const todoStore = useTodoStore()
const auth = useAuthStore()
const router = useRouter()

onMounted(() => {
  todoStore.fetchTodos(auth.token)
})

const goToCreate = () => {
  router.push('/todos/new')
}

const confirmDialog = ref({ open: false, todoId: null, todoName: '' })
const askDelete = (todo) => {
  confirmDialog.value = { open: true, todoId: todo.id, todoName: todo.title }
}
const closeConfirm = () => {
  confirmDialog.value = { open: false, todoId: null, todoName: '' }
}
const confirmDelete = async () => {
  if (confirmDialog.value.todoId) {
    await todoStore.deleteTodo(confirmDialog.value.todoId, auth.token)
  }
  closeConfirm()
}

const updateStatus = async ({ id, status }) => {
  await todoStore.updateTodo(id, { status }, auth.token)
}
</script>

<style scoped>
.todo-list-view {
  max-width: 700px;
  margin: 2rem auto;
}
.todo-list-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.add-btn {
  margin-left: auto;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.add-btn:hover {
  background: #2563eb;
}
.error {
  color: red;
}
.todo-header-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 18px;
}
.todo-header-row .todo-img-wrap {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.todo-header-row .todo-title {
  flex-basis: 220px;
  flex-shrink: 0;
  max-width: 220px;
}
.todo-header-row .todo-priority {
  flex-basis: 100px;
  flex-shrink: 0;
  max-width: 100px;
  text-align: center;
}
.todo-header-row .todo-status {
  flex-basis: 120px;
  flex-shrink: 0;
  max-width: 120px;
  text-align: center;
}
.todo-header-row .todo-actions {
  min-width: 80px;
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
}
.todo-list-ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.empty-tasks-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2.5rem 0 2rem 0;
}
.empty-tasks-message {
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 1.2rem;
  text-align: center;
}
.empty-tasks-svg {
  width: 160px;
  height: 160px;
  opacity: 0.7;
}
</style>
