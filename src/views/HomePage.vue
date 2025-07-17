<script setup lang="ts">
import RoomTable from '@/components/RoomTable.vue';
import { ref } from 'vue';
import Galleria from 'primevue/galleria';

const images = ref([
  {
    itemImageSrc: 'https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D',
    alt: 'Slika 1'
  },
  {
    itemImageSrc: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvdGVsfGVufDB8fDB8fHww',
    alt: 'Slika 2'
  },
  {
    itemImageSrc: 'https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Slika 3'
  },
  {
    itemImageSrc: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Slika 4'
  },
  {
    itemImageSrc: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Slika 5'
  }
]);
</script>

<template>
  <div class="homepage-container">

    <div class="hero">
      <h1 class="title-row">
        <span class="title-text">Dobrodošli u FONsion</span>
        <img
            src="https://img.icons8.com/?size=100&id=BI49CcJebN7h&format=png&color=000000"
            alt="hotel icon"
            class="title-icon"
        />
      </h1>
    </div>

    <div class="gallery-wrapper">
      <div style="display: flex; gap: 2rem; align-items: center; max-width: 1100px; width: 100%; flex-wrap: wrap; height:100%">

        <div class="flex flex-column justify-content-center" style="min-width: 520px; max-width: 520px;">
          <Galleria
              :value="images"
              :numVisible="1"
              :showThumbnails="false"
              :showIndicators="false"
              :showItemNavigators="false"
              :autoPlay="true"
              :circular="true"
              :transitionInterval="5000"
              style="width: 100%;"
          >
            <template #item="slotProps">
              <img
                  :src="slotProps.item.itemImageSrc"
                  :alt="slotProps.item.alt"
                  class="gallery-image"
                  style="width: 100%; max-width: 520px; height: 300px; object-fit: cover; border-radius: 10px; box-shadow: 0 2px 12px rgba(0,0,0,0.09);"
              />
            </template>
          </Galleria>
        </div>

        <div style="flex: 1; display: flex;">
          <div class="info-text">
            <p>
              <strong>FONsion</strong> je savremeni hotel koji nudi udoban smeštaj, moderan ambijent i vrhunsku uslugu.
              Uživajte u elegantnim sobama, restoranu sa pažljivo biranim jelima i opustite se u wellness zoni sa saunom,
              đakuzijem i fitnesom.
            </p>
            <p>
              Takođe, naš hotel raspolaže konferencijskim salama, idealnim za poslovne događaje i seminare.
              Na raspolaganju vam je i recepcija 24/7, kao i besplatan Wi-Fi u celom objektu.
            </p>
            <p>
              Iskusite udobnost i kvalitet — rezervišite svoj boravak već danas!
            </p>
          </div>
        </div>
      </div>
    </div>


    <!-- Room Section -->
    <div class="room-section">
      <h2 class="section-title">Dostupne sobe</h2>
      <RoomTable />
    </div>
  </div>
</template>

<style scoped>
/* General Page Layout */
.homepage-container {
  padding: 2rem;
  min-height: 100vh;
  border-radius:1rem;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, var(--accent), var(--light));
  padding: 2rem;
  border-radius: 1rem;
  text-align: left;
  color: #444545;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

}

/* Gallery Section */
.gallery-wrapper {
  display: flex;
  justify-content: left;
  align-items: center;
  min-height: 340px;
  background: linear-gradient(135deg, var(--light), var(--accent));
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-radius: 1rem;
  padding-left: 1rem;
}

.gallery-image:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
}

.room-section {
  background-color: #ffffffcc;
  padding: 2rem;
  margin-top: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #444545;
  margin-bottom: 1rem;
}
.info-text {
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2.5rem;
  font-weight: normal;
  margin-bottom: 1rem;
  gap: 1rem;
}

.title-text {
  flex: 1;
}


</style>
