<script setup>
import { ref, onMounted } from 'vue'
import BackService from "@/services/BackService";

const rooms = ref([])
const totalRecords = ref(0);
const loading = ref(false);
const backService = new BackService();

const getItems = () =>{
loading.value = true;
  backService.getAllRooms().then((response) =>{
    console.log("getItems returned: ", response.data);
    rooms.value = response.data;
    loading.value = false;
  }).catch((err) => {
    console.error("--- error fetching interpretations: " + JSON.stringify(err));
    loading.value = false;
  });

}

onMounted(() => {
  getItems();
});

</script>

<template>
  <div class="p-4">
    <h1>Sobe</h1>
    <DataTable :value="rooms" :loading="loading" responsiveLayout="scroll" stripedRows>
      <Column field="id" header="ID" />
      <Column field="name" header="Naziv" />
      <Column field="capacity" header="Kapacitet" />
      <Column field="description" header="Opis" />
      <Column field="pricePerNight" header="Cena (€)" />
      <Column header="Slika">
        <template #body="slotProps">
          <img
              v-if="slotProps.data.imageUrl"
              :src="slotProps.data.imageUrl"
              alt="Slika sobe"
              style="width: 80px; border-radius: 8px"
          />
          <span v-else>N/A</span>
        </template>
      </Column>
    </DataTable>
  </div>
</template>



<style scoped>
.room-list {
  padding: 20px;
}

.room-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
}

img {
  max-width: 200px;
  margin-top: 10px;
}
</style>
