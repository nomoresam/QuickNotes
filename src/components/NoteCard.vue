<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import type { Note } from '../types/note'

defineProps<{
  note: Note
}>()

defineEmits<{
  delete: [id: number]
}>()
</script>

<template>
  <BaseCard>
    <template #header>
      <h3>{{ note.title }}</h3>
    </template>

    <p class="note-content">{{ note.content }}</p>

    <ul v-if="note.tags.length" class="tag-list" aria-label="Tags">
      <li v-for="tag in note.tags" :key="tag">#{{ tag }}</li>
    </ul>

    <button class="delete-button" type="button" @click="$emit('delete', note.id)">
      Notiz löschen
    </button>
  </BaseCard>
</template>

<style scoped>
h3 {
  margin: 0;
  color: var(--color-text);
  font-size: 1.15rem;
  overflow-wrap: anywhere;
}

.note-content {
  margin: 0;
  color: #c1d0cd;
  line-height: 1.6;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.tag-list li {
  border-radius: 999px;
  padding: 0.3rem 0.65rem;
  border: 1px solid rgb(45 212 191 / 18%);
  background: var(--color-accent-soft);
  color: var(--color-accent);
  font-size: 0.8rem;
  font-weight: 700;
}

.delete-button {
  margin-top: 1.25rem;
  border: 0;
  border-radius: 0.65rem;
  padding: 0.65rem 0.85rem;
  background: var(--color-danger-soft);
  color: var(--color-danger);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.delete-button:hover {
  background: rgb(244 63 94 / 20%);
}

.delete-button:focus-visible {
  outline: 3px solid rgb(253 164 175 / 24%);
  outline-offset: 2px;
}
</style>
