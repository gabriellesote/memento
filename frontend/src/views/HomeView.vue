<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useNoteStore } from '@/stores/noteStores'
import type { Note } from '@/types/Notes'

import NoteCard from '@/components/Card.vue'
import NoteModal from '@/components/NoteModal.vue' // 1. Importamos o modal

const noteStore = useNoteStore()
const { notes, loading } = storeToRefs(noteStore)

// 2. State para controlar qual nota está selecionada para o modal
const selectedNote = ref<Note | null>(null)

// 3. Funções para abrir e fechar o modal
function openModal(note: Note) {
  selectedNote.value = note
}
function closeModal() {
  selectedNote.value = null
}

// 4. Funções para lidar com os eventos do modal
function handleDeleteNote(noteId: number) {
  // Adicionar confirmação aqui é uma boa prática!
  if (confirm('Tem certeza que deseja apagar esta nota?')) {
    // Chamar a action da store (que criaremos a seguir)
    // noteStore.deleteNoteAction(noteId);
    console.log('Deletar nota:', noteId) // Placeholder
    closeModal()
  }
}

function handleUpdateNote(noteToUpdate: Note) {
  // Chamar a action da store (que criaremos a seguir)
  // noteStore.updateNoteAction(noteToUpdate);
  console.log('Atualizar nota:', noteToUpdate) // Placeholder
  closeModal()
}

onMounted(() => {
  noteStore.fetchNotes()
})
</script>

<template>
  <div class="home">
    <h2>Minhas Anotações</h2>
    <div v-if="loading">Carregando anotações...</div>

    <div v-else class="notes-grid">
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :title="note.title"
        @view="openModal(note)"
      />
      <p v-if="notes.length === 0">Nenhuma anotação encontrada.</p>
    </div>
  </div>

  <NoteModal
    :note="selectedNote"
    @close="closeModal"
    @delete="handleDeleteNote"
    @update="handleUpdateNote"
  />
</template>

<style scoped>
.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
</style>