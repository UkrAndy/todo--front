<template>
  <svg
    class="loader-spinner"
    viewBox="0 0 32 32"
    width="18"
    height="18"
    fill="none"
  >
    <circle
      class="loader-bg"
      cx="16"
      cy="16"
      r="12"
      stroke="var(--color-btn-border)"
      stroke-width="4"
      opacity="0.18"
    />
    <circle
      class="loader-fg"
      cx="16"
      cy="16"
      r="12"
      stroke="var(--color-accent)"
      stroke-width="4"
      stroke-linecap="round"
      stroke-dasharray="60 40"
    />
  </svg>
</template>

<style scoped>
.loader-spinner {
  animation: loader-rotate 0.9s linear infinite;
  display: inline-block;
  vertical-align: middle;
}
@keyframes loader-rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
