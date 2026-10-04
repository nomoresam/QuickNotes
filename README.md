# QuickNotes

QuickNotes ist eine kleine Vue-3-Anwendung zum Anlegen, Löschen und Durchsuchen von Notizen. Jede Notiz besteht aus einem Titel, einem Text und beliebig vielen Tags. Die Notizen werden im `localStorage` gespeichert und bleiben daher nach einem Reload erhalten.

## Setup

Voraussetzung: Node.js 24 oder eine kompatible Version laut `package.json`.

```sh
npm install
npm run dev
```

Weitere Befehle:

```sh
npm run build
npm run lint
```

## Struktur

- `src/components/BaseCard.vue` stellt eine wiederverwendbare Card mit benanntem Header-Slot und Default-Slot bereit.
- `src/components/NoteForm.vue` erfasst neue Notizen und meldet sie per `emit` nach oben.
- `src/components/NoteCard.vue` zeigt eine Notiz an und meldet den Löschwunsch per `emit`.
- `src/components/SearchBar.vue` bindet den Suchbegriff über `v-model` an die Elternkomponente.
- `src/composables/useNotes.js` enthält die Notizlogik für Anlegen, Löschen und Filtern.
- `src/composables/useLocalStorage.js` kapselt Laden und Speichern im Browser.
- `src/types/note.ts` beschreibt die gemeinsame Struktur einer Notiz.

Die Fachlogik liegt in Composables und nicht in den Darstellungskomponenten. Dadurch bleiben die Komponenten klein, wiederverwendbar und leichter zu testen. `App.vue` ruft `useNotes()` genau einmal auf und verteilt Daten und Funktionen über Props und Events.

## Reflexionsfragen

### Warum darf `NoteCard` die Notiz-Prop nicht selbst verändern, und wie wird stattdessen gelöscht?

Props fließen in Vue von der Eltern- zur Kindkomponente und sollen im Kind nicht verändert werden. `NoteCard` sendet deshalb mit `emit('delete', note.id)` nur die ID nach oben. `App.vue` empfängt das Ereignis und ruft die Löschfunktion des Composables auf.

### Was passiert, wenn zwei Komponenten `useNotes()` aufrufen? Teilen sie sich die Notizen?

In dieser Implementierung erzeugt jeder Aufruf einen eigenen reaktiven `notes`-Ref und einen eigenen Watcher. Die Instanzen lesen zwar denselben `localStorage`-Schlüssel, teilen aber nicht automatisch denselben reaktiven Zustand. Deshalb ruft `App.vue` das Composable nur einmal auf und reicht den Zustand über Props und Events weiter.

### Wozu dient das `Note`-Interface, wenn der Code auch ohne liefe?

Das Interface hält die erwartete Form einer Notiz zentral fest: ID, Titel, Inhalt und Tags. TypeScript kann damit falsche oder fehlende Felder bereits während der Entwicklung erkennen. Außerdem verwenden mehrere Komponenten dieselbe Definition, wodurch der Datenfluss leichter verständlich und sicherer zu ändern ist.
