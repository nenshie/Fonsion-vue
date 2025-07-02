<script setup>
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import * as yup from "yup";

import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import Button from "primevue/button";
import Calendar from "primevue/calendar";

const router = useRouter();
const route = useRoute();

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

const submitReservation = async () => {
  if (!await validateForm()) return;

  try {
    const request = {
      roomId: route.params.id,
      email: form.email,
      dateFrom: form.dateFrom ? form.dateFrom.toISOString().slice(0, 10) : null,
      dateTo: form.dateTo ? form.dateTo.toISOString().slice(0, 10) : null,
      discountCode: form.discountCode || null,
      guests: form.guestNames
          .split("\n")
          .map((name) => name.trim())
          .filter((name) => name),
    };

    await axios.post("/reservation/create", request);
    alert("Uspešna rezervacija!");
    router.push("/");
  } catch (err) {
    alert("Greška: " + (err.response?.data?.message || err.message));
  }
};
</script>

<template>
  <div class="page-wrapper">
    <div class="form-container p-shadow-4 p-p-5">
      <h2 class="form-title p-mb-5">Rezerviši sobu</h2>
      <form @submit.prevent="submitReservation" class="p-fluid flex gap-3">

        <div class="p-field">
          <label for="email">Email:</label>
          <InputText id="email" v-model="form.email" type="email" :class="{ 'input-error': errors.email }" />
          <small v-if="errors.email" class="error-msg">{{ errors.email }}</small>
        </div>

        <div class="p-field p-grid">
          <div class="p-col-6">
            <label for="dateFrom">Datum dolaska:</label>
            <Calendar id="dateFrom" v-model="form.dateFrom" dateFormat="yy-mm-dd" showIcon :class="{ 'input-error': errors.dateFrom }" />
            <small v-if="errors.dateFrom" class="error-msg">{{ errors.dateFrom }}</small>
          </div>
          <div class="p-col-6">
            <label for="dateTo">Datum odlaska:</label>
            <Calendar id="dateTo" v-model="form.dateTo" dateFormat="yy-mm-dd" showIcon :class="{ 'input-error': errors.dateTo }" />
            <small v-if="errors.dateTo" class="error-msg">{{ errors.dateTo }}</small>
          </div>
        </div>

        <div class="p-field">
          <label for="discountCode">Promo kod (nije obavezno):</label>
          <InputText id="discountCode" v-model="form.discountCode" />
        </div>

        <div class="p-field">
          <label for="guestNames">Gosti (po jedan po liniji):</label>
          <Textarea
              id="guestNames"
              v-model="form.guestNames"
              rows="4"
              placeholder="Ime Prezime&#10;Ime2 Prezime2"
              :class="{ 'input-error': errors.guestNames }"
          />
          <small v-if="errors.guestNames" class="error-msg">{{ errors.guestNames }}</small>
        </div>

        <Button label="Rezerviši" icon="pi pi-check" type="submit" class="p-mt-4 submit-btn" />
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

/* Neutralna, svetla pozadina sa blagim sivim prelivom */
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}

/* Providna, svetla pozadina forme */
.form-container {
  width: 100%;
  max-width: 480px;
  background-color: #DDDBF1;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(68, 69, 69, 0.15);
  padding: 2rem 2.5rem;
}

.form-title {
  color: var(--dark-gray);
  text-align: center;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 1.5rem;
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

input:focus,
textarea:focus,
.p-calendar:focus,
input.input-error,
textarea.input-error,
.p-calendar.input-error {
  outline: none !important;
  border-color: var(--light-pink) !important;
  box-shadow: 0 0 6px var(--light-pink);
}

.error-msg {
  color: var(--light-pink);
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
  font-weight: 600;
}

.submit-btn {
  width: 100%;
  background-color: var(--light-pink);
  border-color: var(--light-pink);
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
