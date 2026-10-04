<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  background: var(--color-surface);
  box-shadow: 0 16px 34px rgb(0 0 0 / 24%);
}

.card-header {
  border-bottom: 1px solid var(--color-border);
  padding: 1.15rem 1.25rem;
}

.card-body {
  padding: 1.25rem;
}
</style>
