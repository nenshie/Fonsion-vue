<script setup>
import { ref, onMounted } from 'vue'
import RoomService from "@/services/RoomService";
import RoomTable from "@/components/RoomTable.vue";

const rooms = ref([])
const totalRecords = ref(0);
const backService = new RoomService();

const getItems = () =>{
  backService.getAllRooms().then((response) =>{
    console.log("getItems returned: ", response.data);
    rooms.value = response.data;
  }).catch((err) => {
    console.error("--- error fetching interpretations: " + JSON.stringify(err));
  });

}

onMounted(() => {
  getItems();
});

</script>

<template>
  <div class="p-4">
    <h1>Sobe</h1>
<RoomTable></RoomTable>
  </div>
</template>



<style scoped>
</style>
