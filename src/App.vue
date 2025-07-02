<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'

const router = useRouter()

const items = ref([
  {
    label: 'Početna',
    icon: 'pi pi-home',
    command: () => router.push('/')
  },
  {
    label: 'Sobe',
    icon: 'pi pi-building',
    command: () => router.push('/rooms')
  },
  {
    label: 'Moje rezervacije',
    icon: 'pi pi-calendar',
    command: () => router.push('/my-reservations')
  }
])
</script>

<template>
  <div class="app-wrapper">
    <Menubar :model="items" class="custom-menubar" />
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-wrapper {
  background: linear-gradient(135deg, var(--light), var(--accent));
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
}

.custom-menubar {
  background-color: var(--dark);
  border: none;
  border-radius: 0;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.custom-menubar .p-menuitem-text {
  color: white;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.3s;
}

.custom-menubar .p-menuitem-icon {
  color: white;
  margin-right: 0.5rem;
}

.custom-menubar .p-menuitem:hover {
  background-color: var(--accent);
  border-radius: 6px;
  transition: background-color 0.3s;
}

.content {
  padding: 2rem;
  flex-grow: 1;
}
</style>