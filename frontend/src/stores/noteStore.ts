import { defineStore } from 'pinia'
import { ref } from 'vue'
import { noteService } from '@/services/noteService'
import type { NotePayload } from '@/services/noteService'
import type { Note } from '@/types/Notes'

export const useNoteStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])
  const loading = ref<boolean>(false)

  // ESTA FUNÇÃO ESTAVA VAZIA
  async function fetchNotes() {
    loading.value = true
    try {
      const response = await noteService.getAllNotes()
      notes.value = response.data 
    } catch (error) {
      console.error('Erro ao buscar anotações:', error)
    } finally {
      loading.value = false
    }
  }

  // ESTA FUNÇÃO ESTAVA VAZIA
  async function createNoteAction(newNoteData: NotePayload) {
    try {
      const response = await noteService.createNote(newNoteData)
      notes.value.unshift(response.data)
    } catch (error) {
      console.error('Erro ao criar anotação:', error)
    }
  }

  async function updateNoteAction(noteToUpdate: Partial<Note> & { id: string }) {
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
    } catch (error) {
      console.error('Erro ao atualizar anotação:', error)
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