<script setup>
import MenuBar from '@/components/MenuBar.vue'
import { RouterView } from 'vue-router'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="app-wrapper">
    <Toast />
    <MenuBar />
    <main class="content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend&display=swap');

.app-wrapper {
  background: linear-gradient(135deg, var(--light), var(--accent));
  min-height: 100vh;
  font-family: 'Lexend', sans-serif;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 2rem;
  flex-grow: 1;
}
</style>