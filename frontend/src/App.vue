<script setup>
import { RouterView } from 'vue-router'
 import Rocket from '@/assets/crayons/rocket.svg?component'
</script>

<template>
  <header>
    <Rocket class="rocket-icon"/>
    <h1>Memento</h1>
  </header>

  <main >
    <RouterView />
  </main>
</template>

<style scoped>
 
 .rocket-icon{
  width: auto;
  height: 10rem;
  margin-right: 1rem;
 }
header {
  display: flex;
  align-items: center;
  background-color: aqua;
  gap: 1rem;
}

h1 {
  font-size: 4rem;
  color: black;
  margin: 0;
  
}

</style>