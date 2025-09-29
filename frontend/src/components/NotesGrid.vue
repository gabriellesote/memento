<script setup lang="ts">
import type { Note } from '@/types/Notes'
import NoteCard from '@/components/Card.vue'

// 1. Definimos as propriedades que este componente aceita.
// Ele espera um array de 'notes' que segue a nossa interface 'Note'.
defineProps<{
  notes: Note[]
}>()

// 2. Definimos os eventos que este componente pode emitir.
// Ele emitirá um evento 'viewNote' que carrega um objeto 'Note' como dado.
const emit = defineEmits<{
  (e: 'viewNote', note: Note): void
}>()
</script>

<template>
  <div class="notes-grid">
    <NoteCard
      v-for="note in notes"
      :key="note.id"
      :title="note.title"
      
      @view="emit('viewNote', note)"
    />
  </div>
</template>

<style scoped>
/* 4. O estilo do grid agora pertence a este componente */
.notes-grid {
  flex-grow: 1; 
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  min-height: 388px;  
}
</style>