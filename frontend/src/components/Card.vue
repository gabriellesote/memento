<script setup lang="ts">
// O componente continua recebendo o título para exibir no card
defineProps<{
  title: string
}>()

// O componente agora "emite" um evento chamado 'view' quando for clicado.
// A HomeView vai "ouvir" esse evento.
const emit = defineEmits(['view'])
</script>

<template>
  <div class="note-card" @click="emit('view')">
    <h3>{{ title }}</h3>
  </div>
</template>

<style scoped>
.note-card {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  height: 150px; /* Altura fixa para formar o grid */
  display: flex;
  align-items: center;
  justify-content: center;
}

.note-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.note-card h3 {
  margin: 0;
  font-size: 1.1rem;
  text-align: center;
}
</style>