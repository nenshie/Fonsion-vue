<script setup>
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
  <Menubar :model="items" class="custom-menubar" />
</template>

<style scoped>
.custom-menubar {
  background-color: var(--dark);
  border: none;
  border-radius: 0;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}


</style>