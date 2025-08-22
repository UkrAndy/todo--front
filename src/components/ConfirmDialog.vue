:global(:root[data-theme='dark']) .confirm-btn { background: #ff5252 !important;
color: #fff !important; } :global(:root[data-theme='dark']) .confirm-btn:hover {
background: #ff1744 !important; color: #fff !important; }
<template>
  <div class="confirm-dialog-backdrop" @click.self="onCancel">
    <div class="confirm-dialog">
      <div class="confirm-dialog-title">⚠️ {{ title }}</div>
      <div class="confirm-dialog-message">{{ message }}</div>
      <div class="confirm-dialog-actions">
        <button class="confirm-btn" @click="onConfirm">
          {{ $t('general.buttons.delete') }}
        </button>
        <button class="cancel-btn" @click="onCancel">
          {{ $t('general.buttons.cancel') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  message: { type: String, required: true },
})
const emit = defineEmits(['confirm', 'cancel'])
const onConfirm = () => emit('confirm')
const onCancel = () => emit('cancel')
</script>

<style scoped>
.confirm-dialog-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.18);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.confirm-dialog {
  background: var(--color-card-bg);
  color: var(--color-text);
  border-radius: 12px;
  box-shadow: var(--color-card-shadow);
  min-width: 320px;
  max-width: 90vw;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  animation: dialog-pop 0.18s cubic-bezier(0.4, 2, 0.6, 1);
}
@keyframes dialog-pop {
  0% {
    transform: scale(0.92);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.confirm-dialog-title {
  font-size: 1.2em;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: 0.2em;
}
.confirm-dialog-message {
  font-size: 1em;
  color: var(--color-text);
}
.confirm-dialog-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
.confirm-btn {
  background: var(--color-accent);
  color: var(--color-card-bg);
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.confirm-btn:hover {
  background: color-mix(
    in srgb,
    var(--color-accent) 80%,
    var(--color-card-bg) 20%
  );
  color: var(--color-text);
}
.confirm-btn {
  background: #d32f2f;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 1px 4px 0 rgba(60, 60, 60, 0.08);
}
.confirm-btn:hover {
  background: #b71c1c;
  color: #fff;
}

:root[data-theme='dark'] .confirm-btn {
  background: #ff5252;
  color: #fff;
}
:root[data-theme='dark'] .confirm-btn:hover {
  background: #ff1744;
  color: #fff;
}
</style>
