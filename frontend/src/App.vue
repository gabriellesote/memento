<script setup>
import { RouterView } from 'vue-router'
import SapoIcon from '@/assets/crayons/sapo.png' 
</script>

<template>
  <header>
    <img :src="SapoIcon" alt="Ícone de Sapo" class="sapo-icon" />

    <h1>Memento</h1>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.rocket-icon {
  width: auto;
  height: 6rem;
  margin-right: 1rem;
}

header {
  display: flex;
  align-items: center;

  gap: 1rem;
}

h1 {
  font-family: var(--font-crayon);
  font-size: 4rem;
  color: black;
  margin: 0;

}
</style>

<style>

@import url('https://fonts.googleapis.com/css2?family=Playpen+Sans+Hebrew:wght@100..800&display=swap');


:root {
  --font-crayon:  "Playpen Sans Hebrew", cursive;
}

body{
  background-color: #FFF7F1;
}
</style>
 