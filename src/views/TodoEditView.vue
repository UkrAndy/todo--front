<template>
  <div class="todo-edit-view">
    <h2>{{ isCreateMode ? $t('todoEdit.add') : $t('todoEdit.edit') }}</h2>
    <div v-if="todoStore.loading"><Loader /></div>
    <form
      v-if="todo && !todoStore.loading"
      @submit.prevent="isCreateMode ? createTodo() : updateTodo()"
    >
      <input
        v-model="todo.title"
        :placeholder="$t('todoEdit.title')"
        required
      />
      <select v-model="todo.priority">
        <option value="low">{{ $t('general.priority.low') }}</option>
        <option value="medium">{{ $t('general.priority.medium') }}</option>
        <option value="high">{{ $t('general.priority.high') }}</option>
      </select>
      <select v-model="todo.status" class="status-select">
        <option value="pending">{{ $t('general.status.pending') }}</option>
        <option value="done">{{ $t('general.status.done') }}</option>
        <option value="paused">{{ $t('general.status.paused') }}</option>
        <option value="cancelled">{{ $t('general.status.cancelled') }}</option>
      </select>
      <select v-model="todo.image_type">
        <option value="">{{ $t('todoEdit.no_image') }}</option>
        <option value="file">{{ $t('todoEdit.file') }}</option>
        <option value="url">{{ $t('todoEdit.url') }}</option>
      </select>
      <div
        v-if="todo.image_type === 'file'"
        class="file-upload-block"
        style="display: flex; align-items: center; gap: 1.2rem"
      >
        <label class="file-upload-label" style="margin: 0">
          <input
            type="file"
            @change="onFileChange"
            class="file-input"
            style="display: none"
          />
          <span class="file-btn" @click="$el.previousElementSibling.click()">{{
            $t('general.buttons.choose_file')
          }}</span>
        </label>
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" :alt="$t('todoEdit.preview')" />
        </div>
      </div>
      <div v-if="todo.image_type === 'base64'">
        <textarea
          v-model="todo.image_base64"
          :placeholder="$t('todoEdit.base64') + ' ' + $t('todoEdit.string')"
        ></textarea>
      </div>
      <div v-if="todo.image_type === 'url'" class="url-row">
        <input
          v-model="todo.image_url"
          :placeholder="$t('todoEdit.url') + ' URL'"
          @input="imagePreview = todo.image_url"
          class="url-input"
        />
        <div v-if="todo.image_url" class="image-preview url-thumb">
          <img :src="todo.image_url" :alt="$t('todoEdit.preview')" />
        </div>
      </div>
      <div class="form-btn-row">
        <button type="submit" class="main-btn">
          {{ isCreateMode ? $t('todoEdit.create') : $t('todoEdit.update') }}
        </button>
        <button type="button" class="cancel-btn" @click="onCancel">
          {{ $t('general.buttons.cancel') }}
        </button>
      </div>
    </form>
    <div v-if="todoStore.error" class="error">{{ todoStore.error }}</div>
  </div>
</template>

<script setup>
import Loader from '../components/Loader.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTodoStore } from '../store/todo'
import { useAuthStore } from '../store/auth'

const todoStore = useTodoStore()
const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const todo = ref(null)
const originalTodo = ref(null)
const isCreateMode = ref(false)

function onCancel() {
  router.push({ name: 'Todos' })
}

const imagePreview = ref(null)
const onFileChange = (e) => {
  const file = e.target.files[0]
  todo.value.image_file = file
  if (file) {
    const reader = new FileReader()
    reader.onload = (ev) => {
      imagePreview.value = ev.target.result
    }
    reader.readAsDataURL(file)
  } else {
    imagePreview.value = null
  }
}

onMounted(() => {
  if (route.path.endsWith('/new')) {
    isCreateMode.value = true
    todo.value = {
      title: '',
      priority: 'medium',
      status: 'pending',
      image_type: '',
      image_file: null,
      image_base64: '',
      image_url: '',
    }
    originalTodo.value = { ...todo.value }
    return
  }
  const id = route.params.id
  const found = todoStore.todos.find((t) => t.id == id)
  if (!found) {
    router.push({ name: 'Todos' })
    return
  }
  // Копія для порівняння
  todo.value = { ...found }
  originalTodo.value = { ...found }
  // Показати мініатюру поточного зображення
  if (todo.value.image_type === 'file') {
    if (todo.value.image_url_full) {
      imagePreview.value = todo.value.image_url_full
    } else if (todo.value.image_url) {
      imagePreview.value = todo.value.image_url
    } else if (todo.value.image_base64) {
      imagePreview.value = `data:image/*;base64,${todo.value.image_base64}`
    } else {
      imagePreview.value = null
    }
  } else if (todo.value.image_type === 'url') {
    imagePreview.value = todo.value.image_url || null
  } else {
    imagePreview.value = null
  }
})

const updateTodo = async () => {
  // Формуємо тільки змінені поля
  const changed = {}
  for (const key in todo.value) {
    if (todo.value[key] !== originalTodo.value[key]) {
      changed[key] = todo.value[key]
    }
  }
  // Якщо є файл, відправляємо FormData, інакше — звичайний об'єкт
  let payload = changed
  if (changed.image_file) {
    const formData = new FormData()
    for (const key in changed) {
      if (changed[key] !== undefined) {
        formData.append(key, changed[key])
      }
    }
    payload = formData
  }
  await todoStore.updateTodo(todo.value.id, payload)
  router.push({ name: 'Todos' }) // Перехід до списку після оновлення
}

const createTodo = async () => {
  let payload = { ...todo.value }
  if (payload.image_file) {
    const formData = new FormData()
    for (const key in payload) {
      if (payload[key] !== undefined) {
        formData.append(key, payload[key])
      }
    }
    payload = formData
  }
  await todoStore.createTodo(payload)
  router.push({ name: 'Todos' }) // Перехід до списку після створення
}
</script>

<style scoped>
.url-row {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 0.5rem;
}
.url-input {
  flex: 1 1 0%;
  min-width: 0;
}
.url-thumb {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafbfc;
}
.url-thumb img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}
.form-btn-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  margin-top: 1.2rem;
}
.main-btn,
.cancel-btn {
  min-width: 160px;
  max-width: 260px;
  width: 100%;
  height: 48px;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  box-sizing: border-box;
  transition: background 0.2s, color 0.2s, border 0.2s, box-shadow 0.2s;
}
.main-btn {
  background: linear-gradient(90deg, var(--color-accent) 60%, #42a5f5 100%);
  color: #fff;
  border: none;
  box-shadow: 0 2px 8px 0 rgba(25, 118, 210, 0.08);
  padding: 0.9rem 2.2rem;
}
.main-btn:hover {
  background: linear-gradient(90deg, #1565c0 60%, #1976d2 100%);
  box-shadow: 0 4px 16px 0 rgba(25, 118, 210, 0.13);
}
.cancel-btn {
  background: var(--color-card-bg);
  color: var(--color-accent);
  border: 1.5px solid var(--color-accent);
  padding: 0.9rem 2.2rem;
}
.cancel-btn:hover {
  background: var(--color-accent);
  color: var(--color-card-bg);
  border-color: var(--color-accent);
}
.todo-edit-view {
  max-width: 420px;
  margin: 3rem auto;
  background: var(--color-card-bg);
  border-radius: 18px;
  box-shadow: var(--color-card-shadow);
  padding: 2.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: var(--color-text);
  overflow-x: visible;
}
.todo-edit-view h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--color-accent);
  letter-spacing: 0.5px;
}
.todo-edit-view form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.todo-edit-view input[type='text'],
.todo-edit-view input[type='file'],
.todo-edit-view input,
.todo-edit-view select,
.todo-edit-view textarea {
  font-size: 1rem;
  padding: 0.7rem 1rem;
  border: 1.5px solid var(--color-btn-border);
  border-radius: 8px;
  outline: none;
  background: var(--color-btn-bg);
  color: var(--color-text);
  transition: border 0.2s, background 0.3s, color 0.3s;
}
.todo-edit-view input:focus,
.todo-edit-view select:focus,
.todo-edit-view textarea:focus {
  border: 1.5px solid var(--color-accent);
  background: var(--color-card-bg);
}
.todo-edit-view textarea {
  min-height: 80px;
  resize: vertical;
}
.image-preview {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafbfc;
}
.image-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}
.todo-edit-view button[type='submit'] {
  background: linear-gradient(90deg, #1976d2 60%, #42a5f5 100%);
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  padding: 0.9rem 0;
  /* margin-top: 0.5rem; */
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(25, 118, 210, 0.08);
  transition: background 0.2s, box-shadow 0.2s;
  min-width: 160px;
  max-width: 260px;
  width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 48px;
}
/* Cancel button same height as submit */
.todo-edit-view .cancel-btn {
  height: 48px;
  padding-top: 0;
  padding-bottom: 0;
  display: inline-flex;
  align-items: center;
}
.todo-edit-view button[type='submit']:hover {
  background: linear-gradient(90deg, #1565c0 60%, #1976d2 100%);
  box-shadow: 0 4px 16px 0 rgba(25, 118, 210, 0.13);
}
.todo-edit-view .error {
  color: #d32f2f;
  background: color-mix(in srgb, var(--color-card-bg) 90%, #fff3f3 10%);
  border: 1px solid #ffcdd2;
  border-radius: 6px;
  padding: 0.7rem 1rem;
  margin-top: 1.2rem;
  text-align: center;
  font-size: 1rem;
}
.todo-edit-view input[type='file'] {
  padding: 0.5rem 0;
  background: none;
  border: none;
}
/* Яскрава градієнтна кнопка для вибору файлу. Не змінювати при рефакторингу форм! */
.file-btn {
  display: inline-block;
  background: linear-gradient(90deg, #1976d2 60%, #42a5f5 100%);
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(25, 118, 210, 0.08);
  transition: background 0.2s, box-shadow 0.2s;
}
.file-btn:hover {
  background: linear-gradient(90deg, #1565c0 60%, #1976d2 100%);
  box-shadow: 0 4px 16px 0 rgba(25, 118, 210, 0.13);
}
.file-input {
  display: none;
}
.status-select {
  width: 100%;
  max-width: 340px;
  min-width: 220px;
  padding-right: 2.2em; /* Додає місце для стрілки */
}
.todo-edit-view select.status-select {
  min-width: 300px !important;
}
</style>
