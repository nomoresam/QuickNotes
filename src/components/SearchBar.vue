<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function updateSearchTerm(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <label class="search-field">
    <span class="visually-hidden">Notizen durchsuchen</span>
    <span class="search-icon" aria-hidden="true">⌕</span>
    <input
      :value="modelValue"
      type="search"
      placeholder="Titel, Text oder Tag durchsuchen ..."
      @input="updateSearchTerm"
    />
  </label>
</template>

<style scoped>
.search-field {
  position: relative;
  display: block;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 1rem;
  color: var(--color-text-muted);
  font-size: 1.45rem;
  transform: translateY(-54%);
  pointer-events: none;
}

input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--color-border);
  border-radius: 0.8rem;
  padding: 0.85rem 1rem 0.85rem 2.75rem;
  background: var(--color-surface-raised);
  color: var(--color-text);
  font: inherit;
  box-shadow: 0 10px 24px rgb(0 0 0 / 18%);
}

input:focus {
  border-color: var(--color-accent);
  outline: 0;
  box-shadow: 0 0 0 3px rgb(45 212 191 / 15%);
}

input::placeholder {
  color: #708581;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
