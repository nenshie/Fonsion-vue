<script setup lang="ts">
import {onMounted, ref} from 'vue'
import Button from 'primevue/button'
import {useRouter} from 'vue-router'
import {useToast} from "primevue/usetoast";
import RoomService from "@/services/RoomService";


const router = useRouter();
const rooms = ref([])
const toast = useToast();
let totalRecords = ref(0);

const roomService = new RoomService();

const getItems = () =>{
  roomService.getAllRooms().then((response) =>{
    console.log("getItems returned: ", response.data);
    rooms.value = response.data;
    totalRecords.value = response.data.left;
  }).catch((err) => {
    console.error("--- error fetching rooms: " + JSON.stringify(err));
  });

}

const reserve = (room) => {
  router.push(`/reservation/create/${room.id}`);
};

onMounted(() => {
  getItems();
});


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
        :totalRecords="totalRecords"
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rows="5"
        :rowsPerPageOptions="[5, 10, 15]"
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
  color: #D1BEB0;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 6px rgba(68, 69, 69, 0.2);
}

.reserve-btn:hover {
  background-color: #363636;
  color: #CEABB1;
  box-shadow: 0 4px 12px rgba(68, 69, 69, 0.3);
  cursor: pointer;
}
</style>
