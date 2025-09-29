// frontend/src/types/Note.ts

export interface Note {
  id: string; // ou string, dependendo do que sua API retorna
  title: string;
  content: string;
  // Adicione outros campos que sua API retorna, por exemplo:
  createdAt: string;
  // updatedAt: string;
}