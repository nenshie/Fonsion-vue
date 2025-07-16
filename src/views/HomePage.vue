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
      <h1 class="title">Dobrodošli u <span class="brand">FONsion</span></h1>
      <p class="subtitle">
        Pronađite idealnu sobu za vaš boravak — brzo, jednostavno i sigurno.
      </p>
    </div>

    <div class="gallery-wrapper">
      <div style="display: flex; gap: 2rem; align-items: center; max-width: 1100px; width: 100%; flex-wrap: wrap;">

        <div style="flex: 1.4; min-width: 320px; max-width: 520px; display: flex;  justify-content: center;">
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
                  style="width: 100%; max-width: 480px; height: 260px; object-fit: cover; border-radius: 14px; box-shadow: 0 2px 12px rgba(0,0,0,0.09);"
              />
            </template>
          </Galleria>
        </div>

        <div style="flex: 1; min-width: 220px; display: flex;">
          <p class="text-xl">
            FONsion je savremeni hotel koji nudi udoban smeštaj, moderan ambijent i vrhunsku uslugu.
            Uživajte u elegantnim sobama, restoranu sa pažljivo biranim jelima i opustite se u wellness zoni sa saunom, đakuzijem i fitnesom. Idealno mesto za poslovne goste i turiste — sve na jednom mestu, u srcu grada.
          </p>
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
  background: linear-gradient(135deg, #c5e0d8, #b5ffe9);
  min-height: 100vh;
}

/* Hero Section */
.hero {
  background-color: #ceabb1;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  color: #444545;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.brand {
  color: #444545;
}

.subtitle {
  font-size: 1.2rem;
  color: #444545;
}

/* Gallery Section */
.gallery-wrapper {
  display: flex;
  justify-content: left;
  align-items: center;
  min-height: 340px;
  background: linear-gradient(120deg, #e6faf6 70%, #cffbf3 100%);
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-radius: 1rem;
}

.gallery-box {
  width: 100%;
  max-width: 680px;
  aspect-ratio: 16/7;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 18px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.14),
  0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  transition: box-shadow 0.26s ease-in-out;
}

.gallery-box:hover {
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.18),
  0 6px 18px rgba(0, 0, 0, 0.16);
}

.gallery-image {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 14px;
  background: #e8edef;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
  box-shadow 0.3s ease-in-out;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.14);
}

.gallery-image:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
}

.p-galleria-indicators .p-indicator {
  background: #b5ffe9 !important;
  border-radius: 5px;
}

.p-galleria-indicators .p-highlight {
  background: #42837d !important;
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

@media (max-width: 700px) {
  .gallery-box {
    padding: 0.4rem;
    max-width: 95vw;
    aspect-ratio: 20 / 16;
  }

  .gallery-image {
    height: 160px;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>
