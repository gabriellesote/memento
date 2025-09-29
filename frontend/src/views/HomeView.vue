// src/views/HomeView.vue

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useNoteStore } from '@/stores/noteStore'
import type { Note } from '@/types/Notes'

// Componentes
import NoteFormModal from '@/components/NoteFormModal.vue'
import NotesGrid from '@/components/NotesGrid.vue'

// Ícones SVG como componentes
import RightIcon from '@/assets/icons/Right-icon.svg?component'
import LeftIcon from '@/assets/icons/Left-icon.svg?component'
import AddIcon from '@/assets/icons/Add-icon.svg?component'


const noteStore = useNoteStore()
const { notes, loading } = storeToRefs(noteStore)

// --- CONTROLE DOS MODAIS ---
const selectedNote = ref<Note | null>(null)
const isCreateModalOpen = ref(false)

// Estado para guardar os erros de validação vindos da API
const apiErrors = ref<{ title?: string; content?: string } | null>(null)

// --- LÓGICA DA PAGINAÇÃO ---
const currentPage = ref(1)
const itemsPerPage = ref(10)

const paginatedNotes = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return notes.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => {
  if (notes.value.length === 0) return 1
  return Math.ceil(notes.value.length / itemsPerPage.value)
})

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function goToPage(pageNumber: number) {
  currentPage.value = pageNumber
}

// --- FUNÇÕES DOS MODAIS ---
function openEditModal(note: Note) {
  selectedNote.value = note
}

function closeEditModal() {
  selectedNote.value = null
  apiErrors.value = null // Limpa os erros ao fechar
}

function openCreateModal() {
  isCreateModalOpen.value = true
}

function closeCreateModal() {
  isCreateModalOpen.value = false
  apiErrors.value = null // Limpa os erros ao fechar
}

function clearSpecificError(fieldName: 'title' | 'content') {
  if (apiErrors.value && apiErrors.value[fieldName]) {
    apiErrors.value[fieldName] = undefined;
  }
}

// --- HANDLERS DE EVENTOS DO MODAL ---
function handleDeleteNote(noteId: string) {
  if (confirm('Tem certeza que deseja apagar esta nota?')) {
    noteStore.deleteNoteAction(noteId);
    closeEditModal()
  }
}

async function handleUpdateNote(noteToUpdate: Note) {
  apiErrors.value = null
  const result = await noteStore.updateNoteAction(noteToUpdate);
  
  if (result.success) {
    closeEditModal()
  } else {
    // CORREÇÃO APLICADA AQUI
    apiErrors.value = result.errors ?? null
  }
}

async function handleCreateNote(newNoteData: Omit<Note, 'id'>) {
  apiErrors.value = null 
  const result = await noteStore.createNoteAction(newNoteData);

  if (result.success) {
    closeCreateModal()
  } else {
    // CORREÇÃO APLICADA AQUI
    apiErrors.value = result.errors ?? null
  }
}

onMounted(() => {
  noteStore.fetchNotes()
})
</script>
<template>
  <div class="home">
  
    <button @click="openCreateModal" class="add-note-button" aria-label="Criar nova nota">
      <AddIcon class="add-icon" />
    </button>

    <div class="notes-container">
      <div v-if="loading" class="loading-message">Carregando anotações...</div>

      <template v-else-if="notes.length > 0">
        <div class="notes-display-area">
          <button @click="prevPage" :disabled="currentPage === 1" class="nav-arrow">
            <LeftIcon class="left-arrow"/>
          </button>

          <NotesGrid :notes="paginatedNotes" @viewNote="openEditModal" />

          <button @click="nextPage" :disabled="currentPage === totalPages" class="nav-arrow">
            <RightIcon class="right-arrow" />
          </button>
        </div>

        <div class="dot-indicators">
          <span v-for="pageNumber in totalPages" :key="pageNumber" class="dot"
            :class="{ 'active': pageNumber === currentPage }" @click="goToPage(pageNumber)"></span>
        </div>
      </template>

      <p v-else class="no-notes-message">Nenhuma anotação encontrada.</p>
    </div>
  </div>

  <NoteFormModal 
    v-if="isCreateModalOpen" 
    :errors="apiErrors"
    @close="closeCreateModal" 
    @create="handleCreateNote"
    @clear-error="clearSpecificError"
  />

  <NoteFormModal 
    v-if="selectedNote" 
    :note-to-edit="selectedNote"
    :errors="apiErrors"
    @close="closeEditModal" 
    @update="handleUpdateNote"
    @delete="handleDeleteNote" 
    @clear-error="clearSpecificError"
  />
</template>

<style scoped>
/* Seu CSS continua igual */
.home {
  margin-top: 10rem;
}

.home h2 {
  text-align: center;
  margin-bottom: 1rem;
  /* Diminuí a margem para acomodar o botão */
}

/* MUDANÇA 2: O estilo .fab foi completamente substituído por este */
.add-note-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 3rem;
  margin: 0 auto 2rem auto;
  /* Centraliza o botão e dá espaço abaixo */
  border: 1px dashed black;
  border-radius: 50%;
  cursor: pointer;
  background-color: transparent;
   background-color: #86A788;
  color: white;

}

.add-note-button:hover {
  background-color: rgb(136, 173, 142);
  color: white;
}
.add-icon{
  width: 3rem;
  height: 3rem;
}
.notes-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 20px;
}

.notes-display-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.nav-arrow {
  background: none;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .26s ease-in-out;
}

.nav-arrow:hover:not(:disabled) {
  background-color: #F5D2D2;
  .right-arrow, .left-arrow{
    color: #86A788;
  }
}

.nav-arrow:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}

 
.dot-indicators {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 25px;
}

.dot {
  width: 12px;
  height: 12px;
  border: 1px dashed black;
  border-radius: 50%;
  background-color: #FFCFCF;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dot.active {
  background-color: #BDE3C3;
   
}

.loading-message,
.no-notes-message {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
}
</style>