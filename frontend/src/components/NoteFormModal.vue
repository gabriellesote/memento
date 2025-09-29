<script setup lang="ts">
import type { Note } from '@/types/Notes'
import { ref, watch, computed } from 'vue'

// Importando os ícones
import EditIcon from '@/assets/icons/Edit-icon.svg?component'
import TrashIcon from '@/assets/icons/Trash-icon.svg?component'
import AcceptIcon from '@/assets/icons/Accept-icon.svg?component'
import CancelIcon from '@/assets/icons/Cancel-icon.svg?component'
import CloseIcon from '@/assets/icons/Close-icon.svg?component'

// A prop 'noteToEdit' é opcional. Se ela não for passada, o componente entra em modo de criação.
const props = defineProps<{
  noteToEdit?: Note | null
  // NOVO: Prop para receber os erros de validação do componente pai
  errors?: { title?: string; content?: string } | null
}>()

const formattedCreatedAt = computed(() => {
  if (!props.noteToEdit?.createdAt) {
    return ''
  }
  const date = new Date(props.noteToEdit.createdAt)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)
  return `${day}/${month}/${year}`
})

// NOVO: Adicionamos 'clear-error' aos eventos que podem ser emitidos
const emit = defineEmits(['close', 'create', 'update', 'delete', 'clear-error'])

const isEditing = ref(false)
const editableNote = ref<Partial<Note>>({})
const isEditMode = computed(() => !!props.noteToEdit)

watch(
  () => props.noteToEdit,
  (note) => {
    if (note) {
      editableNote.value = { ...note }
      isEditing.value = false
    } else {
      editableNote.value = { title: '', content: '' }
      isEditing.value = true
    }
  },
  { immediate: true }
)

function handleSubmit() {
  // A validação local pode ser removida ou mantida como uma primeira barreira
  if (isEditMode.value) {
    emit('update', editableNote.value)
  } else {
    emit('create', editableNote.value)
  }
}

function handleCancel() {
  if (isEditMode.value && props.noteToEdit) {
    editableNote.value = { ...props.noteToEdit }
    isEditing.value = false
  } else {
    emit('close')
  }
}
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <button class="close-button" @click="emit('close')">
        <CloseIcon />
      </button>

      <div v-if="isEditMode && !isEditing">
        <h2>{{ noteToEdit?.title }}</h2>
        <p class="note-body">{{ noteToEdit?.content }}</p>
        <div class="footer">
          <div class="actions">
            <button @click="isEditing = true" aria-label="Editar nota">
              <EditIcon class="edit-icon" />
            </button>
            <span class="creation-date">Criado em: {{ formattedCreatedAt }}</span>
            <button @click="emit('delete', noteToEdit?.id)" aria-label="Apagar nota">
              <TrashIcon class="trash-icon" />
            </button>
          </div>
        </div>
      </div>

      <div v-else class="edit-mode">
        <div class="form-group">
          <input
            type="text"
            v-model="editableNote.title"
            placeholder="Título"
            class="edit-title"
            @input="emit('clear-error', 'title')"
          />
          <div v-if="errors?.title" class="error-balloon">
            {{ errors.title }}
          </div>
        </div>

        <div class="form-group">
          <textarea
            v-model="editableNote.content"
            placeholder="Conteúdo"
            rows="10"
            maxlength="999"
            class="edit-content"
            @input="emit('clear-error', 'content')"
          ></textarea>
          <div v-if="errors?.content" class="error-balloon">
            {{ errors.content }}
          </div>
        </div>

        <div class="footer edit-actions">
          <button @click="handleCancel" aria-label="Cancelar" class="cancel-button">
            <CancelIcon />
          </button>
          <button @click="handleSubmit" aria-label="Salvar" class="accept-button">
            <AcceptIcon />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ... (Seu CSS existente) ... */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.767);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff7f1;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 5px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  line-height: 1;
}

.note-body {
  white-space: pre-wrap;
  margin: 20px 0;
  min-height: 250px;
  /* Ajuste conforme necessário */
  max-height: 60vh;
  overflow-y: auto;
  line-height: 1.6;
}

.edit-mode {
  display: flex;
  flex-direction: column;
}

.edit-mode h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.footer {
  display: flex;

  justify-content: center;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #eee;
  background-color: none;
}

.actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  width: 100%;
}

.actions button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Regra para estilizar os SVGs dentro dos botões */
.actions button :deep(svg),
.edit-actions button :deep(svg),
.close-button :deep(svg) {
  width: 28px;
  height: 28px;
}

input[type='text'],
textarea {
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin-bottom: 0; /* Removido para o form-group controlar o espaço */
  resize: vertical;
  box-sizing: border-box;
}

.edit-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 25px;
}

.edit-content {
  min-height: 250px;
  flex-grow: 1;
}

.edit-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
}

.edit-actions button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.edit-icon {
  color: #78bbd1;
}

.trash-icon {
  color: #d46363;
}

.cancel-button {
  color: #d32f2f;
  /* Vermelho */
}

.accept-button {
  color: #388e3c;
  /* Verde */
}

/* NOVO: CSS PARA OS BALÕES E GRUPOS DE FORMULÁRIO */
.form-group {
  position: relative;
  margin-bottom: 1rem;
  padding-bottom: 1rem; /* Espaço para o balão não sobrepor o próximo campo */
}

.error-balloon {
  position: absolute;
  top: 100%; /* Posiciona o balão abaixo do campo */
  left: 10px;
  margin-top: 8px; /* Espaço entre o balão e o campo */
  
  background-color: #e53e3e; /* Vermelho para erro */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  z-index: 10;
  
  animation: fadeIn 0.3s ease-out;
}

/* A "setinha" do balão, agora apontando para cima */
.error-balloon::after {
  content: '';
  position: absolute;
  bottom: 100%; /* Posiciona a seta no topo do balão */
  left: 20px;
  
  border-width: 6px;
  border-style: solid;
  border-color: transparent transparent #e53e3e transparent;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>