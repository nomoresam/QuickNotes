import type { ComputedRef, Ref } from 'vue'
import type { Note } from '../types/note'

type NewNote = Omit<Note, 'id'>

export function useNotes(): {
  notes: Ref<Note[]>
  addNote: (note: NewNote) => void
  deleteNote: (id: number) => void
  filteredNotes: (term: Ref<string>) => ComputedRef<Note[]>
}
