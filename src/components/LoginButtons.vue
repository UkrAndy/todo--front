<template>
  <div class="login-btns">
    <router-link to="/login" class="login-btn">{{
      $t('general.buttons.login')
    }}</router-link>
    <router-link to="/register" class="signup-btn">{{
      $t('general.buttons.signup')
    }}</router-link>
  </div>
</template>
<style scoped>
.login-btns {
  display: flex;
  gap: 0.5rem;
}
.login-btn {
  background: var(--color-accent);
  color: var(--color-card-bg);
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  font-size: 1em;
  box-shadow: 0 1px 4px 0 rgba(60, 60, 60, 0.08);
  transition: background 0.2s, color 0.2s;
}
.login-btn:hover {
  background: color-mix(
    in srgb,
    var(--color-accent) 80%,
    var(--color-card-bg) 20%
  );
  color: var(--color-text);
}
.signup-btn {
  background: var(--color-card-bg);
  color: var(--color-accent);
  border: 1.5px solid var(--color-accent);
  border-radius: 6px;
  padding: 0.5rem 2.2rem;
  min-width: 150px;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  font-size: 1em;
  box-shadow: 0 1px 4px 0 rgba(60, 60, 60, 0.08);
  transition: background 0.2s, color 0.2s, border 0.2s;
  text-align: center;
  white-space: nowrap;
}
.signup-btn:hover {
  background: var(--color-accent);
  color: var(--color-card-bg);
  border-color: var(--color-accent);
}
</style>
