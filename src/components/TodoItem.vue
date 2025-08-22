<template>
  <li class="todo-item" :class="[$attrs.class, evenOddClass]">
    <div class="todo-img-wrap">
      <img
        v-if="todo.image_url_full"
        :src="todo.image_url_full"
        :alt="$t('todoList.image')"
        class="todo-img"
      />
      <img
        v-else-if="todo.image_url"
        :src="todo.image_url"
        :alt="$t('todoList.image')"
        class="todo-img"
      />
      <img
        v-else-if="todo.image_base64"
        :src="`data:image/*;base64,${todo.image_base64}`"
        :alt="$t('todoList.image')"
        class="todo-img"
      />
      <span v-else class="todo-img no-img-svg">
        <svg
          viewBox="0 0 64 64"
          width="80"
          height="80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="4"
            y="12"
            width="56"
            height="40"
            rx="8"
            fill="#f3f3f3"
            stroke="#d0d0d0"
            stroke-width="2"
          />
          <rect x="12" y="20" width="40" height="24" rx="4" fill="#e0e7ef" />
          <circle cx="22" cy="32" r="5" fill="#b0b8c9" />
          <path
            d="M12 44l10-12 8 8 8-10 14 14"
            stroke="#b0b8c9"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <rect
            x="4"
            y="12"
            width="56"
            height="40"
            rx="8"
            fill="none"
            stroke="#b0b8c9"
            stroke-width="1"
            stroke-dasharray="4 4"
          />
        </svg>
      </span>
    </div>
    <div class="todo-title">{{ todo.title }}</div>
    <div class="todo-priority">
      {{ $t('general.priority.' + todo.priority) }}
    </div>
    <div class="todo-status">
      <div class="status-select-wrap">
        <select
          v-model="localStatus"
          @change="onStatusChange"
          class="status-select custom-status-select"
          :disabled="statusLoading"
        >
          <option value="pending">{{ $t('general.status.pending') }}</option>
          <option value="done">{{ $t('general.status.done') }}</option>
          <option value="paused">{{ $t('general.status.paused') }}</option>
          <option value="cancelled">
            {{ $t('general.status.cancelled') }}
          </option>
        </select>
        <span class="status-arrow" aria-hidden="true">
          <SmallLoader v-if="statusLoading" />
          <template v-else>▼</template>
        </span>
      </div>
    </div>
    <div class="todo-actions">
      <router-link :to="`/todos/${todo.id}`" :title="$t('general.buttons.edit')"
        >✏️</router-link
      >
      <button
        class="icon-btn"
        @click="$emit('delete', todo.id)"
        :title="$t('general.buttons.delete')"
      >
        🗑️
      </button>
    </div>
  </li>
</template>

// ...existing code...
<script setup>
import { defineProps, ref, watch, computed } from 'vue'
import SmallLoader from './SmallLoader.vue'
const props = defineProps({
  todo: { type: Object, required: true },
  noImage: { type: String, required: true },
  even: { type: Boolean, default: false },
  odd: { type: Boolean, default: false },
})
const emit = defineEmits(['delete', 'status-change'])
const localStatus = ref(props.todo.status)
const statusLoading = ref(false)
watch(
  () => props.todo.status,
  (val) => {
    localStatus.value = val
    statusLoading.value = false
  }
)
const onStatusChange = async () => {
  statusLoading.value = true
  await emit('status-change', { id: props.todo.id, status: localStatus.value })
  // statusLoading will be reset by watcher when prop updates
}
const evenOddClass = computed(() => {
  if (props.even) return 'even'
  if (props.odd) return 'odd'
  return ''
})
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 14px;
  border-radius: 10px;
  background: var(--todo-row-bg, var(--color-card-bg));
  box-shadow: 0 4px 16px 0 rgba(60, 60, 60, 0.13),
    0 1.5px 6px 0 rgba(60, 60, 60, 0.08);
  transition: background 0.3s, box-shadow 0.3s;
  padding: 18px 18px;
}
.todo-item:first-child {
  margin-top: 18px;
}
.todo-item.even {
  --todo-row-bg: var(--color-card-bg);
}

.todo-img-wrap {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
}
.todo-img {
  max-width: 80px;
  max-height: 80px;
  object-fit: contain;
  display: block;
}
.no-img-svg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
}
.todo-title {
  flex-basis: 220px;
  flex-shrink: 0;
  font-weight: 500;
  font-size: 1.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.todo-priority {
  flex-basis: 100px;
  flex-shrink: 0;
  text-align: center;
  text-transform: capitalize;
}
.todo-status {
  /* flex-basis: 120px; */
  flex-shrink: 0;
  text-align: center;
  text-transform: capitalize;
}
.todo-actions {
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
}
.icon-btn {
  background: none;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  font-size: 1.3em;
  cursor: pointer;
  line-height: 1;
  box-shadow: none;
  color: #d32f2f;
  transition: background 0.2s, color 0.2s;
}
.icon-btn:focus {
  outline: none;
  box-shadow: none;
}
.icon-btn:hover {
  background: none;
  color: #b71c1c;
}

.status-select-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.custom-status-select {
  width: 100%;
  padding: 0.35rem 2.2rem 0.35rem 0.7rem;
  border-radius: 6px;
  border: 1.5px solid var(--color-btn-border);
  background: var(--color-btn-bg);
  color: var(--color-btn-text);
  font-size: 1rem;
  text-transform: capitalize;
  outline: none;
  appearance: none;
  transition: border 0.2s, background 0.3s, color 0.3s;
  box-shadow: 0 1px 4px 0 rgba(60, 60, 60, 0.04);
}
.custom-status-select:focus {
  border: 1.5px solid var(--color-accent);
  background: var(--color-card-bg);
}
.status-arrow {
  position: absolute;
  right: 0.8rem;
  pointer-events: none;
  color: var(--color-accent);
  font-size: 1.1em;
  top: 50%;
  transform: translateY(-50%);
  transition: color 0.3s;
}
</style>
