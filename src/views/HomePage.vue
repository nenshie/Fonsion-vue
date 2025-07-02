<script setup lang="ts">
import RoomTable from '@/components/RoomTable.vue'
</script>

<template>
  <div class="homepage-container">
    <section class="hero">
      <h1 class="title">Dobrodošli u <span class="brand">FONsion</span> 🏨</h1>
      <p class="subtitle">Pronađite idealnu sobu za vaš boravak — brzo, jednostavno i sigurno.</p>
    </section>

    <section class="room-section">
      <h2 class="section-title">Dostupne sobe</h2>
      <RoomTable />
    </section>
  </div>
</template>

<style scoped>
.homepage-container {
  padding: 2rem;
  background: linear-gradient(135deg, #C5E0D8, #B5FFE9);
  min-height: 100vh;
}

.hero {
  background-color: #CEABB1;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  color: #444545;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.brand {
  color: #444545;
}

.subtitle {
  font-size: 1.2rem;
  color: #444545;
}

.room-section {
  background-color: #ffffffcc;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #444545;
  margin-bottom: 1rem;
}
</style>
