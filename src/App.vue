<script setup lang="ts">
import { ref } from 'vue'
import NoteForm from './components/NoteForm.vue'
import NoteCard from './components/NoteCard.vue'
import SearchBar from './components/SearchBar.vue'
import { useNotes } from './composables/useNotes.js'

const searchTerm = ref('')
const { notes, addNote, deleteNote, filteredNotes } = useNotes()
const visibleNotes = filteredNotes(searchTerm)
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="brand-mark" aria-hidden="true">QN</div>
      <div>
        <p class="eyebrow">Dein digitaler Notizblock</p>
        <h1>QuickNotes</h1>
        <p class="intro">Gedanken festhalten, mit Tags ordnen und sofort wiederfinden.</p>
      </div>
    </header>

    <main class="workspace">
      <aside class="composer" aria-label="Neue Notiz erstellen">
        <NoteForm @add="addNote" />
      </aside>

      <section class="notes-panel" aria-labelledby="notes-heading">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Sammlung</p>
            <h2 id="notes-heading">Deine Notizen</h2>
          </div>
          <span class="note-count" aria-live="polite">
            {{ visibleNotes.length }} {{ visibleNotes.length === 1 ? 'Notiz' : 'Notizen' }}
          </span>
        </div>

        <SearchBar v-model="searchTerm" />

        <div v-if="visibleNotes.length" class="note-grid">
          <NoteCard v-for="note in visibleNotes" :key="note.id" :note="note" @delete="deleteNote" />
        </div>

        <div v-else class="empty-state" aria-live="polite">
          <div class="empty-icon" aria-hidden="true">✦</div>
          <h3>{{ notes.length ? 'Keine Treffer' : 'Noch keine Notizen' }}</h3>
          <p v-if="notes.length">Versuche einen anderen Suchbegriff.</p>
          <p v-else>Erstelle links deine erste Notiz.</p>
        </div>
      </section>
    </main>
  </div>
</template>

<style>
:root {
  --color-background: #071012;
  --color-surface: #101b1e;
  --color-surface-raised: #152327;
  --color-surface-soft: #0b1518;
  --color-border: #26383c;
  --color-border-strong: #385056;
  --color-text: #eef9f7;
  --color-text-muted: #96aaa7;
  --color-accent: #2dd4bf;
  --color-accent-strong: #14b8a6;
  --color-accent-soft: rgb(45 212 191 / 13%);
  --color-danger: #fda4af;
  --color-danger-soft: rgb(244 63 94 / 12%);

  color: var(--color-text);
  background: var(--color-background);
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
  background:
    radial-gradient(circle at 12% 0%, rgb(45 212 191 / 12%), transparent 30rem),
    radial-gradient(circle at 95% 90%, rgb(20 184 166 / 6%), transparent 28rem),
    var(--color-background);
}

button,
input,
textarea {
  font: inherit;
}

.app-shell {
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 3.5rem 0 4rem;
}

.app-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.brand-mark {
  display: grid;
  flex: 0 0 auto;
  width: 3.5rem;
  height: 3.5rem;
  place-items: center;
  border-radius: 1rem;
  background: var(--color-accent);
  color: #032b27;
  font-weight: 900;
  letter-spacing: -0.04em;
  box-shadow: 0 12px 28px rgb(45 212 191 / 22%);
}

.eyebrow {
  margin: 0 0 0.25rem;
  color: var(--color-accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h1,
h2 {
  margin: 0;
  color: var(--color-text);
  letter-spacing: -0.035em;
}

h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1;
}

h2 {
  font-size: 1.65rem;
}

.intro {
  margin: 0.55rem 0 0;
  color: var(--color-text-muted);
}

.workspace {
  display: grid;
  grid-template-columns: minmax(270px, 350px) minmax(0, 1fr);
  gap: 2rem;
  align-items: start;
}

.composer {
  position: sticky;
  top: 1.5rem;
}

.notes-panel {
  min-width: 0;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.note-count {
  border-radius: 999px;
  padding: 0.4rem 0.7rem;
  border: 1px solid rgb(45 212 191 / 22%);
  background: var(--color-accent-soft);
  color: var(--color-accent);
  font-size: 0.78rem;
  font-weight: 800;
}

.note-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.25rem;
}

.empty-state {
  display: grid;
  min-height: 19rem;
  margin-top: 1.25rem;
  place-content: center;
  justify-items: center;
  border: 1px dashed var(--color-border-strong);
  border-radius: 1rem;
  background: rgb(16 27 30 / 55%);
  color: var(--color-text-muted);
  text-align: center;
}

.empty-icon {
  display: grid;
  width: 3rem;
  height: 3rem;
  margin-bottom: 0.8rem;
  place-items: center;
  border-radius: 50%;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  font-size: 1.35rem;
}

.empty-state h3 {
  margin: 0;
  color: var(--color-text);
}

.empty-state p {
  margin: 0.4rem 0 0;
}

@media (max-width: 860px) {
  .workspace {
    grid-template-columns: 1fr;
  }

  .composer {
    position: static;
  }
}

@media (max-width: 580px) {
  .app-shell {
    width: min(100% - 1.25rem, 1180px);
    padding-top: 1.75rem;
  }

  .app-header {
    align-items: flex-start;
  }

  .intro {
    font-size: 0.9rem;
  }

  .note-grid {
    grid-template-columns: 1fr;
  }
}
</style>
