<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ReservationService from '@/services/ReservationService';

const email = ref('');
const token = ref('');
const verified = ref(false);
const reservations = ref([]);
const errorMessage = ref('');
const loading = ref(false);

const route = useRoute();
const reservationService = new ReservationService();

const verifyAccess = () => {
  if (!email.value || !token.value) return;
  loading.value = true;
  reservationService.getReservationsByToken(email.value, token.value)
      .then(response => {
        reservations.value = response.data;
        verified.value = true;
        errorMessage.value = '';
        console.log("My reservation details: ", response.data);
      })
      .catch(error => {
        verified.value = false;
        reservations.value = [];
        errorMessage.value = error.response?.data?.message || 'Greška pri proveri.';
      })
      .finally(() => {
        loading.value = false;
      });
};

const showCancelDialog = ref(false);
const cancelTargetId = ref(null);

const askToCancel = (id) => {
  cancelTargetId.value = id;
  showCancelDialog.value = true;
};

const confirmCancel = () => {
  if (!cancelTargetId.value) return;

  loading.value = true;
  reservationService.cancelReservation(cancelTargetId.value)
      .then(() => {
        verifyAccess();
      })
      .catch(() => {
        errorMessage.value = "Došlo je do greške prilikom otkazivanja rezervacije.";
      })
      .finally(() => {
        showCancelDialog.value = false;
        loading.value = false;
      });
};
const cancelReservation = (id) => {
  if (!confirm('Da li ste sigurni da želite da otkažete ovu rezervaciju?')) {
    return;
  }

  loading.value = true;

  reservationService.cancelReservation(id)
      .then(() => {
        // Refresh current reservations
        verifyAccess();
      })
      .catch((err) => {
        errorMessage.value = "Došlo je do greške prilikom otkazivanja rezervacije.";
        console.error(err);
      })
      .finally(() => {
        loading.value = false;
      });
};

watch(
    () => route.query,
    (query) => {

      const emailFromQuery = query.email;
      const tokenFromQuery = query.token;

      if (emailFromQuery && tokenFromQuery) {
        email.value = emailFromQuery;
        token.value = tokenFromQuery;
        verifyAccess();
      }
    },
    { immediate: true }
);

</script>


<template>
  <div class="">
      <h2 class="page-title">Moje rezervacije</h2>


    <div class="container shadow-5 p-5 rounded-box">

      <div v-if="loading" class="text-gray-600 text-center mt-6">Proveravam informacije...</div>

      <div v-if="!verified && !loading" class="mt-4">
        <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

        <div class="input-group">
          <label for="email">Email</label>
          <input v-model="email" id="email" type="email" class="form-input" />
        </div>
        <div class="input-group">
          <label for="token">Token</label>
          <input v-model="token" id="token" type="text" class="form-input" />
        </div>

        <button @click="verifyAccess" class="submit-btn">Pristupi</button>
      </div>

      <div v-if="verified && !loading">
        <div v-if="reservations.length === 0" class="text-center text-gray-600 ">
          Nemate nijednu aktivnu rezervaciju.
        </div>

        <div v-else class="reservations-grid">
        <div
            v-for="(res, index) in reservations"
            :key="res.id"
            class="reservation-box"
        >
          <div class="reservation-header">
            <h3>Detalji rezervacije {{ index + 1 }}</h3>
          </div>

          <p><strong>Soba:</strong> {{ res.room.name }}</p>
          <p><strong>Datumi:</strong> {{ res.dateFrom }} – {{ res.dateTo }}</p>
          <p><strong>Cena:</strong> {{ res.totalPrice }} €</p>
          <p><strong>Status:</strong> {{ res.status }}</p>

          <p v-if="res.discountCode">
            <strong>Korišćen promo kod:</strong> {{ res.discountCode.code }}
          </p>

          <div v-if="res.generatedPromoCode" class="promo-box">
            <p><strong>Vaš promo kod za sledeću rezervaciju:</strong></p>
            <p class="promo-code">{{ res.generatedPromoCode }}</p>
            <p class="promo-msg">
              Možete ga iskoristiti prilikom sledeće rezervacije ili podeliti sa nekim za popust.
            </p>
          </div>

          <div class="mt-4">
            <Button
                v-if="res.status === 'ACTIVE'"
                @click="askToCancel(res.id)"
                class="cancel-btn"
            >
              Otkaži rezervaciju
            </Button>
            <p v-else class="text-sm italic text-gray-500">Ova rezervacija je otkazana.</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="showCancelDialog" modal header="Da li ste sigurni?" :style="{ width: '350px'}">
    <div class="p-1">
      <p class="text-gray-900 font-medium text-md mb-5">
        Da li ste sigurni da želite da otkažete ovu rezervaciju?
      </p>
      <div class="flex gap-3 justify-content-between">
        <Button label="Ne" @click="showCancelDialog = false" severity="secondary" />
        <Button label="Da, otkaži" @click="confirmCancel" severity="danger" />
      </div>
    </div>
  </Dialog>
</template>




<style scoped>
:root {
  --dark-gray: #444545;
  --gray: #C9C9C9;
  --light-pink: #CEABB1;
  --soft-pink: #f3efdd;
  --soft-bg: rgba(241, 237, 234, 0.5);
}

.page-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--dark-gray);
  text-align: left;
}

.container {
  max-width: 760px;
  height: 100%;
  margin: 0 auto;
  background: linear-gradient(135deg, var(--soft-pink), #ffffff);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(68, 69, 69, 0.15);
  padding: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

label {
  font-weight: 600;
  color: var(--dark-gray);
}

.form-input {
  padding: 0.6rem;
  border-radius: 8px;
  border: solid;
  border-color: var(--soft-bg);
  background-color:  var(--soft-bg);
  font-size: 1rem;
}

.submit-btn {
  margin-top: 1rem;
  width: 100%;
  background-color: var(--light-pink);
  border: none;
  border-radius: 10px;
  color: var(--dark-gray);
  font-weight: 700;
  font-size: 1.05rem;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: var(--dark-gray);
  color: white;
}

.reservations-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin-top: 1.5rem;
}

.reservation-box {
  background: #fff;
  border: 1.5px solid var(--gray);
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(100, 100, 100, 0.12);
  padding: 1.5rem;
  color: var(--dark-gray);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Box heading */
.reservation-header {
  margin-bottom: 0.8rem;
}
.reservation-header h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--dark-gray);
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.4rem;
  margin-bottom: 0.6rem;
}

.promo-box {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
}

.promo-code {
  font-size: 1.1rem;
  font-weight: bold;
  color: #15803d;
}

.promo-msg {
  font-size: 0.9rem;
  color: #166534;
  margin-top: 0.25rem;
}

.cancel-btn {
  background-color: #dc2626;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-btn:hover {
  background-color: #b91c1c;
}
</style>


