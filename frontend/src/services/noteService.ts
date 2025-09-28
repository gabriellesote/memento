// frontend/src/services/noteService.ts
import apiClient from './api';
import type { Note } from '@/types/Notes'; // Importamos nossa Interface!
import type { AxiosResponse } from 'axios';

// Definindo a interface para os dados de criação/atualização (sem o ID)
export interface NotePayload {
  title: string;
  content: string;
}

export const noteService = {
  // A função agora retorna uma Promessa de um array de Notas
  getAllNotes(): Promise<AxiosResponse<Note[]>> {
    return apiClient.get<Note[]>('/notes'); // Verifique se '/notes' é o endpoint correto
  },

  createNote(payload: NotePayload): Promise<AxiosResponse<Note>> {
    return apiClient.post<Note>('/notes', payload);
  },

  updateNote(id: number, payload: NotePayload): Promise<AxiosResponse<Note>> {
    return apiClient.put<Note>(`/notes/${id}`, payload);
  },

  deleteNote(id: number): Promise<AxiosResponse<void>> {
    return apiClient.delete(`/notes/${id}`);
  }
};