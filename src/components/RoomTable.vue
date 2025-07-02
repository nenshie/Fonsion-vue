<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import axios from 'axios'
import { useRouter } from 'vue-router'
import {useI18n} from "vue-i18n";
import {useToast} from "primevue/usetoast";

const router = useRouter();
const rooms = ref([])
const toast = useToast();
let totalRecords = ref(0);

onMounted(async () => {
  try {
    const response = await axios.get("/room/get-all");
    rooms.value = response.data
    totalRecords.value = rooms.value.length
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
        :totalRecords="rooms.length"
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rows="10"
        :rowsPerPageOptions="[10, 25, 50]"
        currentPageReportTemplate="Prikazano {first} do {last} od ukupno {totalRecords} stavki"
    >

      <!-- Naziv sobe -->
      <Column field="name" header="Naziv sobe" class="flex-column align-items-center justify-content-center bg-white">
        <template #body="slotProps">
          <div class="text-center w-full overflow-hidden">
            {{ slotProps.data.name }}
          </div>
        </template>
      </Column>

      <!-- Kapacitet -->
      <Column field="capacity" header="Kapacitet" class="flex-column align-items-center justify-content-center bg-white">
        <template #body="slotProps">
          <div class="text-center">
            {{ slotProps.data.capacity }}
          </div>
        </template>
      </Column>

      <!-- Cena po noći -->
      <Column field="pricePerNight" header="Cena po noći (€)" class="flex-column align-items-center justify-content-center bg-white">
        <template #body="slotProps">
          <div class="text-center">
            € {{ slotProps.data.pricePerNight.toFixed(2) }}
          </div>
        </template>
      </Column>

      <!-- Slika sobe -->
      <Column header="Slika" class=" flex-column align-items-center justify-content-center bg-white">
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

      <!-- Dugme rezervacije -->
      <Column header="" class=" flex-column align-items-center justify-content-center bg-white">
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
  background-color: #444545;
  color: #B5FFE9;
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
  border-bottom: 2px solid #CEABB1;
}

.custom-room-table .p-datatable-tbody > tr:nth-child(even) {
  background-color: #F7FAF7;
}

.custom-room-table .p-datatable-tbody > tr:nth-child(odd) {
  background-color: #FFFFFF;
}

.custom-room-table .p-datatable-tbody > tr:hover {
  background-color: #CEABB1;
  color: #444545;
  cursor: pointer;
}

.room-image {
  width: 150px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
}

.reserve-btn {
  width: 100%;
  background-color: #444545;
  color: #D1BEB0 !important;
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
