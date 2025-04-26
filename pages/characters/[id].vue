<template>
  <div class="container py-5">
    <!-- Botón de Volver -->
    <div class="text-center mt-5">
      <NuxtLink :to="`/?page=${fromPage}`" class="btn btn-shenlong">
        ← Return to List
      </NuxtLink>
    </div>

    <div class="card shadow-lg overflow-hidden mb-5">
      <div class="row g-0 d-flex flex-column flex-lg-row">
        <!-- Imagen personaje -->
        <div
          class="col-lg-4 bg-dark d-flex align-items-center justify-content-center p-3"
        >
          <img
            :src="character.image"
            alt="Imagen del personaje"
            class="img-fluid rounded no-select"
            style="max-height: 400px; object-fit: contain"
          />
        </div>

        <!-- Info personaje -->
        <div class="col-lg-8 p-4">
          <h1 class="mb-4 title-dragonball no-select text-center no-select">
            {{ character.name }}
          </h1>

          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <strong>Race:</strong> {{ character.race }}
            </li>
            <li class="list-group-item">
              <strong>Gender:</strong> {{ character.gender }}
            </li>
            <li class="list-group-item">
              <strong>Ki Base:</strong> {{ character.ki }}
            </li>
            <li class="list-group-item">
              <strong>Affiliation:</strong> {{ character.affiliation }}
            </li>
            <li class="list-group-item">
              <strong>Description:</strong> {{ character.description }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Slider de transformaciones -->
    <div v-if="character.transformations?.length" class="mb-5">
      <h2 class="text-center mb-4 title-dragonball no-select">
        Transformations
      </h2>

      <div class="d-flex flex-wrap justify-content-center gap-4">
        <div
          v-for="transformation in character.transformations"
          :key="transformation.id"
          class="card p-3"
          style="width: 16rem"
        >
          <img
            :src="transformation.image"
            class="card-img-top no-select"
            alt="Transformación"
            style="height: 200px; object-fit: contain"
          />
          <div class="card-body text-center">
            <h5 class="card-title">{{ transformation.name }}</h5>
            <p class="card-text">
              <strong>Ki:</strong> {{ transformation.ki }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useHead } from "#imports";

const route = useRoute();
const characterId = route.params.id;
const fromPage = route.query.fromPage || 1;

const {
  data: character,
  pending,
  error,
} = await useFetch(`https://dragonball-api.com/api/characters/${characterId}`);

watchEffect(() => {
  if (character.value) {
    useHead({
      title: `Character: ${character.value.name}`,
    });
  }
});
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
