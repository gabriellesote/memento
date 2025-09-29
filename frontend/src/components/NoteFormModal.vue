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
}>()

const formattedCreatedAt = computed(() => {
  // Se não houver nota ou data, não retorna nada
  if (!props.noteToEdit?.createdAt) {
    return ''
  }

  // Cria um objeto Date a partir da string da API
  const date = new Date(props.noteToEdit.createdAt)

  // Extrai as partes da data
  const day = String(date.getDate()).padStart(2, '0') // Adiciona um '0' à esquerda se for menor que 10
  const month = String(date.getMonth() + 1).padStart(2, '0') // Meses começam do 0, então somamos 1
  const year = String(date.getFullYear()).slice(-2) // Pega os dois últimos dígitos do ano

  // Retorna a string no formato desejado
  return `${day}/${month}/${year}`
})
// Definimos todos os eventos que o componente pode emitir para o pai (HomeView)
const emit = defineEmits(['close', 'create', 'update', 'delete'])

const isEditing = ref(false)
// 'editableNote' guarda o estado do formulário, seja para uma nota nova ou uma existente
const editableNote = ref<Partial<Note>>({})

// Uma computed property para saber facilmente se estamos editando ou criando
const isEditMode = computed(() => !!props.noteToEdit)

// Este 'watch' é o cérebro do componente. Ele reage à mudança da prop 'noteToEdit'.
watch(
  () => props.noteToEdit,
  (note) => {
    if (note) { // Se uma nota foi passada, entramos no modo de edição.
      editableNote.value = { ...note } // Copiamos os dados para o nosso rascunho
      isEditing.value = false // E começamos no modo de visualização
    } else { // Se nenhuma nota foi passada...
      editableNote.value = { title: '', content: '' } // O rascunho começa em branco
      isEditing.value = true // E já começamos direto no formulário para criar
    }
  },
  { immediate: true } // A opção 'immediate' força a execução do watch assim que o componente é criado
)

// Função unificada para salvar (cria ou atualiza)
function handleSubmit() {
  // Uma validação simples para garantir que os campos não estão vazios
  if (editableNote.value.title && editableNote.value.content) {
    if (isEditMode.value) {
      emit('update', editableNote.value) // Emite o evento de 'update' se estivermos editando
    } else {
      emit('create', editableNote.value) // Emite o evento de 'create' se estivermos criando
    }
  }
}

// Lida com o cancelamento
function handleCancel() {
  if (isEditMode.value && props.noteToEdit) {
    // Se estiver editando, apenas restaura os dados originais e volta para o modo de visualização
    editableNote.value = { ...props.noteToEdit }
    isEditing.value = false
  } else {
    // Se estiver criando, o cancelamento simplesmente fecha o modal
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


        <input type="text" v-model="editableNote.title" placeholder="Título" class="edit-title" />
        <textarea v-model="editableNote.content" placeholder="Conteúdo" rows="10" maxlength="999"
          class="edit-content"></textarea>

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
  background-color: #FFF7F1;
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

  margin-bottom: 15px;
  resize: vertical;
  box-sizing: border-box;
  /* Garante que padding não afete a largura total */
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
  color: #D32F2F;
  /* Vermelho */
}

.accept-button {
  color: #388E3C;
  /* Verde */
}
</style>