import { defineStore } from 'pinia'
import { ref } from 'vue'
import { noteService } from '@/services/noteService'
import type { NotePayload } from '@/services/noteService'
import type { Note } from '@/types/Notes'

// Definindo um tipo para a resposta das actions para deixar o código mais claro
type ActionResult = {
  success: boolean;
  errors?: { title?: string; content?: string };
}

export const useNoteStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])
  const loading = ref<boolean>(false)

  async function fetchNotes() {
    loading.value = true
    try {
      const response = await noteService.getAllNotes()
      // Ordena as notas da mais nova para a mais antiga ao buscar
      notes.value = response.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error('Erro ao buscar anotações:', error)
    } finally {
      loading.value = false
    }
  }
  
  // --- FUNÇÃO MODIFICADA ---
  async function createNoteAction(newNoteData: NotePayload): Promise<ActionResult> {
    try {
      const response = await noteService.createNote(newNoteData)
      // Adiciona a nova nota no início do array
      notes.value.unshift(response.data)
      // Retorna sucesso para a HomeView
      return { success: true }
    } catch (error: any) {
      console.error('Erro ao criar anotação:', error)
      // Verifica se é um erro de validação do backend (status 400)
      if (error.response && error.response.status === 400) {
        const errorsObject: { title?: string; content?: string } = {};
        const messages = error.response.data.message || [];
        messages.forEach((msg: string) => {
          if (msg.toLowerCase().includes('título') || msg.toLowerCase().includes('title')) {
            errorsObject.title = msg;
          }
          if (msg.toLowerCase().includes('conteúdo') || msg.toLowerCase().includes('content')) {
            errorsObject.content = msg;
          }
        });
        // Retorna falha e o objeto de erros para a HomeView
        return { success: false, errors: errorsObject };
      }
      // Retorna um erro genérico se não for um erro 400
      return { success: false, errors: {} };
    }
  }

  // --- FUNÇÃO MODIFICADA ---
  async function updateNoteAction(noteToUpdate: Partial<Note> & { id: string }): Promise<ActionResult> {
    try {
      const payload: NotePayload = {
        title: noteToUpdate.title || '',
        content: noteToUpdate.content || ''
      };
      
      const response = await noteService.updateNote(noteToUpdate.id, payload)
      const index = notes.value.findIndex((note) => note.id === noteToUpdate.id)
      if (index !== -1) {
        notes.value[index] = response.data
      }
      // Retorna sucesso para a HomeView
      return { success: true }
    } catch (error: any) {
      console.error('Erro ao atualizar anotação:', error)
       // Verifica se é um erro de validação do backend (status 400)
      if (error.response && error.response.status === 400) {
        const errorsObject: { title?: string; content?: string } = {};
        const messages = error.response.data.message || [];
        messages.forEach((msg: string) => {
          if (msg.toLowerCase().includes('título') || msg.toLowerCase().includes('title')) {
            errorsObject.title = msg;
          }
          if (msg.toLowerCase().includes('conteúdo') || msg.toLowerCase().includes('content')) {
            errorsObject.content = msg;
          }
        });
        // Retorna falha e o objeto de erros para a HomeView
        return { success: false, errors: errorsObject };
      }
      // Retorna um erro genérico se não for um erro 400
      return { success: false, errors: {} };
    }
  }

  async function deleteNoteAction(noteId: string) {
    try {
      await noteService.deleteNote(noteId)
      notes.value = notes.value.filter((note) => note.id !== noteId)
    } catch (error) {
      console.error('Erro ao deletar anotação:', error)
    }
  }

  return { 
    notes, 
    loading, 
    fetchNotes, 
    createNoteAction, 
    updateNoteAction, 
    deleteNoteAction 
  }
})