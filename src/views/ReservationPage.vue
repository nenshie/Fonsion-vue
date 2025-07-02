<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  email: '',
  dateFrom: '',
  dateTo: '',
  roomId: null,
  discountCode: '',
  guests: []
})

const guestNamesText = ref('')

const submitReservation = async () => {
  form.value.guests = guestNamesText.value
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0)

  try {
    const response = await axios.post('/reservation/create', form.value)
    const token = response.data.token
    router.push({ path: '/reservation-details', query: { token, email: form.value.email } })
  } catch (err) {
    alert('Greška prilikom rezervacije: ' + err.response?.data?.message || err.message)
  }
}
</script>

<template>
  <div class="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
    <h2 class="text-2xl font-semibold mb-4">Rezervacija sobe</h2>

    <form @submit.prevent="submitReservation">
      <!-- Email -->
      <div class="mb-4">
        <label>Email:</label>
        <input v-model="form.email" type="email" class="border p-2 w-full" required />
      </div>

      <!-- Datum od / do -->
      <div class="mb-4 flex gap-4">
        <div class="flex-1">
          <label>Datum od:</label>
          <input v-model="form.dateFrom" type="date" class="border p-2 w-full" required />
        </div>
        <div class="flex-1">
          <label>Datum do:</label>
          <input v-model="form.dateTo" type="date" class="border p-2 w-full" required />
        </div>
      </div>

      <!-- Soba (za sada ručno, kasnije ćemo povući sa servera) -->
      <div class="mb-4">
        <label>ID sobe:</label>
        <input v-model="form.roomId" type="number" class="border p-2 w-full" required />
      </div>

      <!-- Gosti -->
      <div class="mb-4">
        <label>Gosti (unesi ime i prezime, po jedno po liniji):</label>
        <textarea v-model="guestNamesText" class="border p-2 w-full" rows="3"></textarea>
      </div>

      <!-- Promo kod -->
      <div class="mb-4">
        <label>Promo kod (opciono):</label>
        <input v-model="form.discountCode" type="text" class="border p-2 w-full" />
      </div>

      <!-- Dugme -->
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
        Rezerviši
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>