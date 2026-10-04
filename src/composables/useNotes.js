import { computed, unref } from 'vue'
import { useLocalStorage } from './useLocalStorage.js'

export function useNotes() {
  const notes = useLocalStorage('quicknotes', [])

  function addNote(note) {
    const nextId =
      notes.value.reduce((highestId, currentNote) => {
        return Math.max(highestId, currentNote.id)
      }, 0) + 1

    notes.value.push({
      id: nextId,
      ...note,
    })
  }

  function deleteNote(id) {
    notes.value = notes.value.filter((note) => note.id !== id)
  }

  function filteredNotes(term) {
    return computed(() => {
      const searchTerm = String(unref(term) ?? '')
        .trim()
        .toLocaleLowerCase('de')

      if (!searchTerm) {
        return notes.value
      }

      return notes.value.filter((note) => {
        const titleMatches = note.title.toLocaleLowerCase('de').includes(searchTerm)
        const contentMatches = note.content.toLocaleLowerCase('de').includes(searchTerm)
        const tagMatches = note.tags.some((tag) => tag.toLocaleLowerCase('de').includes(searchTerm))

        return titleMatches || contentMatches || tagMatches
      })
    })
  }

  return { notes, addNote, deleteNote, filteredNotes }
}
