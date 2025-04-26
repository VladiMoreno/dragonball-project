<template>
  <div class="max-w-7xl mx-auto p-8">
    <h1 class="text-3xl font-bold text-center my-5 dragon-ball-title">
      Characters of Dragon Ball
    </h1>

    <div v-if="pending" class="text-center">Loading characters...</div>
    <div v-else-if="error" class="text-center text-red-500">
      Error loading characters 😢
    </div>
    <div v-else>
      <div class="row">
        <div
          v-for="character in characters"
          :key="character.id"
          class="col-12 col-sm-6 col-lg-3 mb-4"
        >
          <div class="card h-100 shadow-sm py-4 px-2 rounded-4">
            <img
              :src="character.image"
              class="card-img-top character-image-card no-select"
              alt="Imagen de personaje"
            />
            <div class="card-body d-flex flex-column">
              <h5 class="dragon-ball-title-card">
                {{ character.name }}
              </h5>
              <p class="dragon-ball-text-card">Race: {{ character.race }}</p>
              <p class="dragon-ball-text-card">
                Gender: {{ character.gender || "Desconocido" }}
              </p>
              <div class="mt-auto">
                <NuxtLink
                  :to="`/characters/${character.id}?fromPage=${currentPage}`"
                  class="btn btn-shenlong"
                >
                  Details
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Paginación -->
      <div v-if="links" class="row mb-5">
        <div class="d-grid gap-2 d-md-flex justify-content-center">
          <div class="col-2">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="!links.previous"
              class="btn btn-info w-100 mt-2 disabled:opacity-50"
            >
              Previous
            </button>
          </div>
          <div class="col-2">
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="!links.next"
              class="btn btn-success w-100 mt-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

// Leer ruta y router
const route = useRoute();
const router = useRouter();

// Obtener página actual desde query param o asumir 1
const currentPage = ref(Number(route.query.page) || 1);
const limit = 8;

// URL reactiva basada en página y límite
const currentUrl = computed(() => {
  return `https://dragonball-api.com/api/characters?page=${currentPage.value}&limit=${limit}`;
});

// Datos reactivos
const { data, pending, error, refresh } = await useFetch(
  () => currentUrl.value
);

// Acceso a los personajes
const characters = computed(() => data.value?.items || []);

// Acceso a los enlaces de paginación
const links = computed(() => data.value?.links || {});

// Funciones para cambiar de página
const goToPage = (page) => {
  if (page >= 1) {
    router.push({ path: "/", query: { page } });
    currentPage.value = page;
  }
};

// Refrescar automáticamente al cambiar URL
watchEffect(() => {
  refresh();
});

// Cambiar título de la pestaña
useHead({
  title: `Characters`,
});
</script>

<style>
.character-image-card {
  height: 300px;
  width: 180px;
  margin: 0 auto;
}

.btn-shenlong {
  /* Prefijos para compatibilidad */
  background: -webkit-linear-gradient(
    135deg,
    #2ecc71 0%,
    #2ecc71 40%,
    #27ae60 60%,
    #145a32 100%
  );
  background: -moz-linear-gradient(
    135deg,
    #2ecc71 0%,
    #2ecc71 40%,
    #27ae60 60%,
    #145a32 100%
  );
  background: -o-linear-gradient(
    135deg,
    #2ecc71 0%,
    #2ecc71 40%,
    #27ae60 60%,
    #145a32 100%
  );
  background: linear-gradient(
    135deg,
    #2ecc71 0%,
    #2ecc71 40%,
    #27ae60 60%,
    #145a32 100%
  );

  background-size: 200% 200%;
  background-position: left center;
  border: none;
  color: #fff;
  width: 100%;
  margin-top: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;

  /* También prefijo en transición para Safari */
  -webkit-transition: background-position 0.3s ease;
  transition: background-position 0.3s ease;
}

.btn-shenlong:hover {
  background-position: right center;
  color: #fff;
}
</style>
