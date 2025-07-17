<script setup>
import {reactive, ref} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from 'primevue/usetoast';
import * as yup from "yup";

import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import ReservationService from "@/services/ReservationService";

const toast = useToast();

const router = useRouter();
const route = useRoute();

const reservationService = new ReservationService();

const form = reactive({
  email: "",
  dateFrom: null,
  dateTo: null,
  discountCode: "",
  guestNames: "",
});

const errors = reactive({
  email: "",
  dateFrom: "",
  dateTo: "",
  guestNames: ""
});

// Yup schema za validaciju
const schema = yup.object().shape({
  email: yup.string().required("Email je obavezan").email("Email nije validan"),
  dateFrom: yup.date().required("Datum dolaska je obavezan"),
  dateTo: yup
      .date()
      .required("Datum odlaska je obavezan")
      .min(yup.ref('dateFrom'), "Datum odlaska ne može biti pre datuma dolaska"),
  guestNames: yup.string().required("Unesite bar jednog gosta"),
});

const validateForm = async () => {
  try {
    await schema.validate(form, { abortEarly: false });
    Object.keys(errors).forEach(key => errors[key] = "");
    return true;
  } catch (validationErrors) {
    Object.keys(errors).forEach(key => errors[key] = "");
    validationErrors.inner.forEach(err => {
      errors[err.path] = err.message;
    });
    return false;
  }
};

const submitReservation = () => {
  validateForm().then(isValid => {
    if (!isValid) {
      return;
    }

    const request = {
      roomId: route.params.id,
      email: form.email,
      dateFrom: form.dateFrom ? form.dateFrom.toISOString().slice(0, 10) : null,
      dateTo: form.dateTo ? form.dateTo.toISOString().slice(0, 10) : null,
      discountCode: form.discountCode || null,
      guests: form.guestNames
          .split("\n")
          .map(name => name.trim())
          .filter(name => name),
    };

    reservationService.createReservation(request)
        .then(() => {
          toast.add({severity:'success', summary: 'Uspeh', detail: 'Uspešna rezervacija!', life: 3000});
          router.push("/");
        })
        .catch(() => {
          toast.add({severity:'error', summary: 'Greška', detail: "Došlo je do greške prilikom rezervacije", life: 3000});
        })

  });
};

</script>

<template>
  <div class="page-wrapper flex align-items-center justify-content-center">
    <div class="form-container shadow-5 p-5">
      <h2 class="form-title p-mb-5">Rezerviši sobu</h2>
      <form @submit="submitReservation" class="p-fluid p-grid flex flex-column gap-3">

        <div class="p-field p-col-12 flex flex-column">
          <label for="email" class="pb-1">Email:</label>
          <InputText id="email" v-model="form.email" type="email" :class="{ 'input-error': errors.email }"/>
          <small v-if="errors.email" class="error-msg">{{ errors.email }}</small>
        </div>

        <div class="p-field p-col-12 flex flex-column p-md-6">
          <label for="dateFrom" class="pb-1">Datum dolaska:</label>
          <Calendar id="dateFrom" v-model="form.dateFrom" dateFormat="yy-mm-dd" showIcon :class="{ 'input-error': errors.dateFrom }" />
          <small v-if="errors.dateFrom" class="error-msg">{{ errors.dateFrom }}</small>
        </div>

        <div class="p-field p-col-12 flex flex-column p-md-6">
          <label for="dateTo" class="pb-1">Datum odlaska:</label>
          <Calendar id="dateTo" v-model="form.dateTo" dateFormat="yy-mm-dd" showIcon :class="{ 'input-error': errors.dateTo }" />
          <small v-if="errors.dateTo" class="error-msg">{{ errors.dateTo }}</small>
        </div>

        <div class="p-field p-col-12 flex flex-column">
          <label for="discountCode" class="pb-1">Promo kod (nije obavezno):</label>
          <InputText id="discountCode" v-model="form.discountCode" />
        </div>

        <div class="p-field p-col-12">
          <label for="guestNames" class="pb-1">Gosti (po jedan po liniji):</label>
          <Textarea
              id="guestNames"
              v-model="form.guestNames"
              rows="4"
              placeholder="Ime Prezime&#10;Ime2 Prezime2"
              :class="{ 'input-error': errors.guestNames }"
          />
          <small v-if="errors.guestNames" class="error-msg">{{ errors.guestNames }}</small>
        </div>

        <div class="p-col-12">
          <Button label="Rezerviši" icon="pi pi-check" type="submit" class="submit-btn"/>
        </div>

      </form>
    </div>
  </div>
</template>


<style scoped>
:root {
  --dark-gray: #444545;
  --gray: #C9C9C9;
  --light-pink: #CEABB1;
}

.page-wrapper {
  min-height: 80vh;
  background: linear-gradient(135deg, var(--light), var(--accent));
  color: var(--dark);
  font-family: 'Segoe UI', sans-serif;
}

.form-container {
  max-width: 480px;
  background-color: #DDDBF1;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(68, 69, 69, 0.15);
}

.form-title {
  color: var(--dark-gray);
  text-align: center;
  font-weight: 700;
  font-size: 2rem;
}

label {
  color: var(--dark-gray);
  font-weight: 600;
}

input,
textarea,
.p-calendar {
  border-radius: 8px !important;
  border: 1.5px solid var(--gray) !important;
  padding: 0.6rem !important;
  font-size: 1rem;
  color: var(--dark-gray) !important;
  background-color: white !important;
  transition: border-color 0.3s ease;
}

.error-msg {
  color: red;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  font-weight: 400;
}

.submit-btn {
  margin-top: 1rem;
  width: 100%;
  background-color: var(--light-pink);
  border-color: var(--light-pink);
  border-radius:10px;
  color: var(--dark-gray);
  font-weight: 700;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: var(--dark-gray);
  border-color: var(--dark-gray);
  color: white;
}
</style>
