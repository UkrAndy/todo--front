<template>
  <div class="loader-wrap">
    <svg class="loader" width="40" height="40" viewBox="0 0 40 40">
      <circle
        class="loader-bg"
        cx="20"
        cy="20"
        r="18"
        fill="none"
        stroke="#eee"
        stroke-width="4"
      />
      <circle
        class="loader-fg"
        cx="20"
        cy="20"
        r="18"
        fill="none"
        stroke="#42b983"
        stroke-width="4"
        stroke-linecap="round"
        stroke-dasharray="90 60"
      />
    </svg>
  </div>
</template>

<script setup>
// No logic needed
</script>

<style scoped>
.loader-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
}
.loader {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
