<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Projeto Memo</h1>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
/* Estilos básicos para o layout */
header {
  line-height: 1.5;
  border-bottom: 1px solid #ccc;
  padding: 1rem;
  background-color: blue;
}

main {
  padding: 1rem;
  background-color: blueviolet;
}

h1 {
  font-size: 1.5rem;
  font-weight: 600;
}
</style>