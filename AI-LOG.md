# AI-LOG

- **Prompt:** „Warum sendet `NoteCard` ein Lösch-Event, anstatt die Notiz direkt zu löschen?“  
  **Übernommen:** `NoteCard` meldet mit `emit('delete', note.id)` nur den Löschwunsch nach oben; `App.vue` ruft anschließend `deleteNote()` auf.  
  **Geändert/verstanden:** Props gehören der Elternkomponente und werden im Kind nicht verändert. Dadurch bleibt der Datenfluss eindeutig: Daten nach unten, Ereignisse nach oben.

- **Prompt:** „Wie funktioniert `v-model` bei unserer eigenen `SearchBar`-Komponente?“  
  **Übernommen:** Die Komponente erhält den aktuellen Wert über die Prop `modelValue` und sendet Änderungen mit `emit('update:modelValue', value)` zurück.  
  **Geändert/verstanden:** `v-model="searchTerm"` ist die Kurzform für genau diese Prop-Event-Kombination. Die `SearchBar` besitzt den Suchzustand nicht selbst.

- **Prompt:** „Warum liegt die Notizlogik in `useNotes.js` und nicht direkt in `App.vue` oder den Komponenten?“  
  **Übernommen:** Anlegen, Löschen und Filtern werden im Composable gebündelt; die Komponenten kümmern sich hauptsächlich um Darstellung und Benutzereingaben.  
  **Geändert/verstanden:** Diese Trennung hält Komponenten klein, verhindert doppelte Logik und macht die Zuständigkeiten im Projekt leichter nachvollziehbar.

- **Prompt:** „Was passiert, wenn zwei Komponenten jeweils `useNotes()` aufrufen - teilen sie sich dann dieselben Notizen?“  
  **Übernommen:** In der aktuellen Implementierung erzeugt jeder Aufruf einen eigenen `notes`-Ref und einen eigenen Watcher. `App.vue` ruft das Composable deshalb einmal auf und verteilt Daten und Funktionen über Props und Events.  
  **Geändert/verstanden:** Derselbe `localStorage`-Schlüssel bedeutet nicht automatisch einen gemeinsam reaktiven Zustand zwischen zwei Composable-Instanzen.

- **Prompt:** „Warum brauchen wir das `Note`-Interface, obwohl JavaScript die App auch ohne Interface ausführen könnte?“  
  **Übernommen:** Das Interface definiert zentral `id`, `title`, `content` und `tags` und wird von Formular, Notizkarte und der Typdeklaration des Composables verwendet.  
  **Geändert/verstanden:** TypeScript erkennt fehlende oder falsch typisierte Felder bereits während der Entwicklung und stellt sicher, dass alle Komponenten dieselbe Datenstruktur erwarten.
