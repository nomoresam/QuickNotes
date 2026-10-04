<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from './BaseCard.vue'
import type { Note } from '../types/note'

type NewNote = Omit<Note, 'id'>

const emit = defineEmits<{
  add: [note: NewNote]
}>()

const title = ref('')
const content = ref('')
const tagsInput = ref('')

function submitNote() {
  const cleanTitle = title.value.trim()
  const cleanContent = content.value.trim()

  if (!cleanTitle || !cleanContent) {
    return
  }

  const tags = [
    ...new Set(
      tagsInput.value
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  ]

  emit('add', {
    title: cleanTitle,
    content: cleanContent,
    tags,
  })

  title.value = ''
  content.value = ''
  tagsInput.value = ''
}
</script>

<template>
  <BaseCard>
    <template #header>
      <div>
        <p class="eyebrow">Schnell festhalten</p>
        <h2>Neue Notiz</h2>
      </div>
    </template>

    <form class="note-form" @submit.prevent="submitNote">
      <label>
        <span>Titel</span>
        <input v-model="title" name="title" type="text" placeholder="Worum geht es?" required />
      </label>

      <label>
        <span>Notiz</span>
        <textarea
          v-model="content"
          name="content"
          rows="7"
          placeholder="Schreibe deinen Gedanken auf ..."
          required
        ></textarea>
      </label>

      <label>
        <span>Tags</span>
        <input
          v-model="tagsInput"
          name="tags"
          type="text"
          placeholder="Studium, Idee, Wichtig"
          aria-describedby="tags-help"
        />
      </label>
      <p id="tags-help" class="field-help">Mehrere Tags mit Kommas trennen.</p>

      <button type="submit">Notiz hinzufügen</button>
    </form>
  </BaseCard>
</template>

<style scoped>
.eyebrow {
  margin: 0 0 0.25rem;
  color: var(--color-accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h2 {
  margin: 0;
  color: var(--color-text);
  font-size: 1.35rem;
}

.note-form {
  display: grid;
  gap: 1rem;
}

label {
  display: grid;
  gap: 0.45rem;
}

label span {
  color: var(--color-text);
  font-size: 0.9rem;
  font-weight: 750;
}

input,
textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--color-border);
  border-radius: 0.7rem;
  padding: 0.78rem 0.85rem;
  background: var(--color-surface-soft);
  color: var(--color-text);
  font: inherit;
  transition:
    border-color 150ms ease,
    box-shadow 150ms ease;
}

textarea {
  resize: vertical;
}

input:focus,
textarea:focus {
  border-color: var(--color-accent);
  outline: 0;
  box-shadow: 0 0 0 3px rgb(45 212 191 / 15%);
}

input::placeholder,
textarea::placeholder {
  color: #637875;
}

.field-help {
  margin: -0.6rem 0 0;
  color: var(--color-text-muted);
  font-size: 0.78rem;
}

button {
  border: 0;
  border-radius: 0.75rem;
  padding: 0.82rem 1rem;
  background: var(--color-accent);
  color: #032b27;
  font: inherit;
  font-weight: 800;
  cursor: pointer;
  transition:
    background 150ms ease,
    transform 150ms ease;
}

button:hover {
  background: #5eead4;
  transform: translateY(-1px);
}

button:focus-visible {
  outline: 3px solid rgb(45 212 191 / 30%);
  outline-offset: 2px;
}
</style>
