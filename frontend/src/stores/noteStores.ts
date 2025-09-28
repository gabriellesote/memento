// frontend/src/stores/noteStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { noteService } from '@/services/noteService'
import type { Note } from '@/types/Notes' // Importamos nossa Interface!

export const useNoteStore = defineStore('notes', () => {
  // O state agora sabe que 'notes' é um array de objetos do tipo Note
  const notes = ref<Note[]>([]);
  const loading = ref<boolean>(false);

  // Action para buscar os dados da API
  async function fetchNotes() {
    loading.value = true;
    try {
      const response = await noteService.getAllNotes();
      notes.value = response.data; // O TS garante que response.data é um Note[]
    } catch (error) {
      console.error('Erro ao buscar anotações:', error);
    } finally {
      loading.value = false;
    }
  }
  
  // (As outras actions, como create, update, delete, virão aqui depois)

  return { notes, loading, fetchNotes };
});