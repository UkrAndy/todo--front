<template>
  <header class="header">
    <MainMenu />
    <div class="header-right">
      <ThemeSwitcher />
      <LangSwitcher />
      <UserSection />
    </div>
  </header>
</template>

<script setup>
import MainMenu from './MainMenu.vue'
import LangSwitcher from './LangSwitcher.vue'
import UserSection from './UserSection.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  background: var(--color-header);
  padding: 0;
  box-shadow: var(--color-header-shadow);
  margin-bottom: 0;
  min-height: 64px;
  width: 100%;
  z-index: 10;
  transition: background 0.3s, box-shadow 0.3s;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: auto;
  padding-right: 2rem;
}
</style>
