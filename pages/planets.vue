<template>
  <div class="max-w-7xl mx-auto p-8">
    <h1 class="text-3xl font-bold text-center my-5 dragon-ball-title">
      Planets of Dragon Ball
    </h1>

    <div class="max-w-7xl mx-auto p-8">
      <div class="text-center my-5">
        <button
          type="button"
          class="btn btn-primary btn-lg"
          @click="openModal()"
        >
          + ADD PLANET
        </button>
      </div>

      <!-- Modal invocado -->
      <div v-if="showModal" class="mb-5">
        <div class="bg-white p-4">
          <h2 class="text-2xl font-bold mb-4 text-center">Add new planet</h2>

          <form @submit.prevent="savePlanet">
            <div class="mb-4">
              <label class="block mb-2 font-bold">Name of the planet</label>
              <input
                v-model="newPlanet.name"
                type="text"
                class="form-control"
              />
              <p v-if="errors.name" class="text-red-500 text-sm">
                {{ errors.name }}
              </p>
            </div>

            <div class="mb-4">
              <label class="block mb-2 font-bold">Description</label>
              <textarea
                v-model="newPlanet.description"
                class="form-control"
              ></textarea>
              <p v-if="errors.description" class="text-red-500 text-sm">
                {{ errors.description }}
              </p>
            </div>

            <div class="mb-4">
              <label class="block mb-2 font-bold">Image (URL)</label>
              <input
                v-model="newPlanet.image"
                type="url"
                class="form-control"
              />
              <p v-if="errors.image" class="text-red-500 text-sm">
                {{ errors.image }}
              </p>
            </div>

            <div class="d-grid gap-2 d-md-flex justify-content-center">
              <button
                class="btn btn-danger me-md-2 btn-lg"
                type="button"
                @click="closeModal"
              >
                Cancel
              </button>
              <button class="btn btn-primary btn-lg" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Mensajes de carga/error -->
    <div v-if="pending" class="text-center">Loading planets...</div>
    <div v-else-if="error" class="text-center text-red-500">
      Error loading planets 😢
    </div>

    <!-- Listado de Planetas -->
    <div v-else>
      <div
        v-for="planet in allPlanets"
        :key="planet.id || planet.localId"
        class="row"
      >
        <div class="card shadow-lg overflow-hidden mb-5">
          <div class="row g-0 d-flex flex-column flex-lg-row">
            <!-- Imagen -->
            <div
              class="col-lg-4 bg-dark d-flex align-items-center justify-content-center p-3"
            >
              <img
                :src="planet.image"
                alt="Planet Image"
                class="img-fluid rounded no-select"
                style="max-height: 400px; object-fit: contain"
              />
            </div>

            <!-- Info -->
            <div class="col-lg-8 p-4">
              <h1 class="mb-4 title-dragonball no-select text-center">
                {{ planet.name }}
              </h1>

              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <strong>Is destroyed:</strong>
                  {{ planet.isDestroyed ? "YES" : "NO" }}
                </li>
                <li class="list-group-item">
                  <strong>Description:</strong> {{ planet.description }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";

const open = ref(false);

// Datos de API
const currentUrl = computed(() => `https://dragonball-api.com/api/planets`);
const { data, pending, error, refresh } = await useFetch(
  () => currentUrl.value
);
const planetsAPI = computed(() => data.value?.items || []);

// Datos de LocalStorage
const localPlanets = ref([]);

// Modal y formulario
const showModal = ref(false);

const newPlanet = reactive({
  name: "",
  description: "",
  image: "",
});

const errors = reactive({
  name: "",
  description: "",
  image: "",
});

// Planetas combinados
const allPlanets = computed(() => {
  return [...localPlanets.value, ...planetsAPI.value];
});

// Funciones modal
const openModal = () => {
  resetForm();
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

// Validar formulario
const validate = () => {
  let valid = true;
  errors.name = "";
  errors.description = "";
  errors.image = "";

  if (!newPlanet.name.trim()) {
    errors.name = "The name is required.";
    valid = false;
  }
  if (!newPlanet.description.trim()) {
    errors.description = "The description is required.";
    valid = false;
  }
  if (!newPlanet.image.trim()) {
    errors.image = "The URL is required.";
    valid = false;
  }
  return valid;
};

// Guardar planeta
const savePlanet = () => {
  if (validate()) {
    const newEntry = {
      ...newPlanet,
      isDestroyed: false,
      localId: Date.now(), // ID único local
    };
    localPlanets.value.unshift(newEntry);
    localStorage.setItem("localPlanets", JSON.stringify(localPlanets.value));
    closeModal();
  }
};

// Cargar planetas guardados
const loadLocalPlanets = () => {
  const saved = localStorage.getItem("localPlanets");
  if (saved) {
    localPlanets.value = JSON.parse(saved);
  }
};

// Reset formulario
const resetForm = () => {
  newPlanet.name = "";
  newPlanet.description = "";
  newPlanet.image = "";
};

// Al entrar
onMounted(() => {
  loadLocalPlanets();
});

// Cambiar título pestaña
useHead({
  title: `Planets`,
});
</script>

<style>
/* Tu mismo CSS para .btn-shenlong y estilos bonitos */
.character-image-card {
  height: 300px;
  width: 180px;
  margin: 0 auto;
}

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

.text-red-500 {
  color: red;
  font-weight: 500;
}
</style>
