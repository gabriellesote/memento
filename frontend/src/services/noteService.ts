import apiClient from './api';
import type { Note } from '@/types/Notes';
import type { AxiosResponse } from 'axios';

export interface NotePayload {
  title: string;
  content: string;
}

export const noteService = {
  getAllNotes(): Promise<AxiosResponse<Note[]>> {
    return apiClient.get<Note[]>('/notes');
  },

  createNote(payload: NotePayload): Promise<AxiosResponse<Note>> {
    return apiClient.post<Note>('/notes', payload);
  },

  // MUDANÇA AQUI: id agora é 'string'
  updateNote(id: string, payload: NotePayload): Promise<AxiosResponse<Note>> {
    // ANTES: return apiClient.put<Note>(`/notes/${id}`, payload);
    // AGORA:
    return apiClient.patch<Note>(`/notes/${id}`, payload);
  },

  // MUDANÇA AQUI: id agora é 'string'
  deleteNote(id: string): Promise<AxiosResponse<void>> {
    return apiClient.delete(`/notes/${id}`);
  }
};