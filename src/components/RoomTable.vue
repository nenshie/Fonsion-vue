<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter();
const rooms = ref([])

onMounted(async () => {
  try {
    const response = await axios.get("/room/get-all");
    rooms.value = response.data
  } catch (err) {
    console.error('Greška pri učitavanju soba:', err)
  }
})

const reserve = (room) => {
  router.push(`/reservation/create/${room.id}`);
};
</script>

<template>
  <div class="room-table-container" style="padding: 1rem; border-radius: 1rem; box-shadow: 0 4px 12px rgba(68, 69, 69, 0.1); background: #fff;">
    <DataTable
        :value="rooms"
        stripedRows
        responsiveLayout="scroll"
        class="custom-room-table"
        :showGridlines="false"
        style="background: transparent;"
    >
      <Column field="name" header="Naziv sobe" />
      <Column field="capacity" header="Kapacitet" />
      <Column field="pricePerNight" header="Cena po noći (€)" />
      <Column header="Slika" :style="{ width: '150px' }">
        <template #body="slotProps">
          <img
              v-if="slotProps.data.imageUrl"
              :src="slotProps.data.imageUrl"
              alt="Slika sobe"
              class="room-image"
          />
          <span v-else>N/A</span>
        </template>
      </Column>
      <Column header="Akcija" :style="{ width: '100px' }">
        <template #body="slotProps">
          <Button
              label="Rezerviši"
              class="reserve-btn"
              @click="reserve(slotProps.data)"
              aria-label="Rezerviši"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
.custom-room-table .p-datatable-thead > tr > th {
  background-color: #444545; /* tamno siva */
  color: #B5FFE9; /* svetlozelena */
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
  border-bottom: 2px solid #CEABB1;
}

.custom-room-table .p-datatable-tbody > tr:nth-child(even) {
  background-color: #F7FAF7; /* skoro bela sa zelenim podtonom, da ne smeta */
}

.custom-room-table .p-datatable-tbody > tr:nth-child(odd) {
  background-color: #FFFFFF; /* čista bela za kontrast */
}

.custom-room-table .p-datatable-tbody > tr:hover {
  background-color: #CEABB1; /* pastel roze */
  color: #444545;
  cursor: pointer;
}

.room-image {
  width: 200px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
}

.reserve-btn {
  width: 100%;
  background-color: #444545; /* tamno siva */
  color: #D1BEB0 !important; /* svetlozelena */
  border: none;
  font-weight: 600;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 6px rgba(68, 69, 69, 0.2);
}

.reserve-btn:hover {
  background-color: #363636;
  color: #CEABB1 !important;
  box-shadow: 0 4px 12px rgba(68, 69, 69, 0.3);
  cursor: pointer;
}
</style>
