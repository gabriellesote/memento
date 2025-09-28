<script setup lang="ts">
import type { Note } from '@/types/Notes'
import { ref, watch } from 'vue'

import EditIcon from '@/assets/icons/Edit-icon.svg?component'
import TrashIcon from '@/assets/icons/Trash-icon.svg?component'
import AcceptIcon from '@/assets/icons/Accept-icon.svg?component'
import CancelIcon from '@/assets/icons/Cancel-icon.svg?component'
import CloseIcon from '@/assets/icons/Close-icon.svg?component'

const props = defineProps<{
  note: Note | null
}>()

const emit = defineEmits(['close', 'update', 'delete'])
const isEditing = ref(false)
const editableNote = ref<Partial<Note>>({})


watch(
  () => props.note,
  (newNote) => {
    if (newNote) {
      editableNote.value = { ...newNote }
      isEditing.value = false
    }
  }
)

function handleUpdate() {
  if (editableNote.value.title && editableNote.value.content) {
    emit('update', editableNote.value)
    isEditing.value = false
  }
}

function handleCancel() {
  if (props.note) {
    editableNote.value = { ...props.note }
  }
  isEditing.value = false
}
</script>

<template>
  <div v-if="note" class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <button class="close-button" @click="emit('close')">
        <CloseIcon class="close-icon" />
      </button>

      <div v-if="!isEditing">
        <h2>{{ note.title }}</h2>
        <p class="note-body">{{ note.content }}</p>

        <div class="footer">
          <div class="actions">
            <button @click="isEditing = true" aria-label="Editar nota">

              <EditIcon />

            </button>
            <button @click="emit('delete', note.id)" aria-label="Apagar nota">

              <TrashIcon />

            </button>
          </div>
        </div>
      </div>

      <div v-else>
        <input type="text" v-model="editableNote.title" placeholder="Título" />
        <textarea v-model="editableNote.content" placeholder="Conteúdo" rows="10"></textarea>
        <div class="footer edit-actions">
          <button @click="handleCancel" aria-label="Cancelar alterações" class="cancel-button">
            <CancelIcon class="cancel-icon" />
          </button>
          <button @click="handleUpdate" aria-label="Aceitar alterações" class="accept-button">
            <AcceptIcon class="accept-icon" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;

}

.note-body {
  white-space: pre-wrap;
  margin: 20px 0;
  min-height: fit-content;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
 
}

.actions {
  display: flex;
  background-color: blanchedalmond;
  justify-content: space-between;
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

.actions button:hover {
  color: #000;
}

.actions button :deep(svg) {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

input[type='text'],
textarea {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin-bottom: 15px;
}

input[type='text'] {
  font-size: 1.5rem;
  font-weight: bold;
}

.edit-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.edit-actions button {
  height: 40px;
  width: 40px;
  background-color: transparent;
  border: none;

}

.cancel-button {

  color: #5E2020;

}


.accept-button {

  color: #2E661E;

}
</style>