<template>
  <!-- Navbar minimal -->
  <header class="w-full text-center py-6">
    <div class="flex justify-center mt-5">
      <NuxtLink to="/" class="mx-4">
        <img
          src="/public/images/dragon-ball-4-stars.png"
          alt="Dragon Ball"
          class="no-select"
          style="width: 40px"
        />
        Characters
      </NuxtLink>

      <NuxtLink to="/planets" class="mx-4">
        <img
          src="/public/images/planeta-tierra.png"
          alt="Planet Namek"
          class="no-select"
          style="width: 40px"
        />
        Planets
      </NuxtLink>
    </div>
  </header>

  <!-- Contenido de la página -->
  <div class="container">
    <Transition name="fade" mode="out-in">
      <UApp>
        <NuxtPage />
      </UApp>
    </Transition>
  </div>
</template>

<style>
body {
  min-height: 100vh;
  margin: 0;
  padding: 0;

  /* Degradado para todos */
  background: -webkit-linear-gradient(
    180deg,
    #ffcc00 0%,
    #ff9900 40%,
    #ff6600 70%,
    #cc3300 100%
  ); /* Para Safari, iOS */
  background: -moz-linear-gradient(
    180deg,
    #ffcc00 0%,
    #ff9900 40%,
    #ff6600 70%,
    #cc3300 100%
  ); /* Para Firefox */
  background: -o-linear-gradient(
    180deg,
    #ffcc00 0%,
    #ff9900 40%,
    #ff6600 70%,
    #cc3300 100%
  ); /* Para Opera */
  background: linear-gradient(
    180deg,
    #ffcc00 0%,
    #ff9900 40%,
    #ff6600 70%,
    #cc3300 100%
  ); /* Estándar */

  background-attachment: fixed;
  background-size: cover;
}

@font-face {
  font-family: "Saiyan Sans";
  src: url("/fonts/Saiyan-Sans.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

.dragon-ball-title {
  font-family: "Saiyan Sans", sans-serif;
  font-size: 4rem; /* Tamaño grande tipo logo */
  text-align: center;
  color: #fff200; /* Amarillo Dragon Ball */
  text-shadow: 3px 3px 0 #ff9900,
    /* Sombra principal naranja brillante */ 5px 5px 0 #cc6600; /* Sombra secundaria más intensa */
}

.dragon-ball-title-card {
  font-family: "Saiyan Sans", sans-serif;
  font-size: 2.5rem; /* Tamaño grande tipo logo */
  text-align: center;
  color: black; /* Amarillo Dragon Ball */
  text-shadow: 3px 3px 0 #ff9900,
    /* Sombra principal naranja brillante */ 5px 5px 0 #cc6600; /* Sombra secundaria más intensa */
}

.dragon-ball-text-card {
  font-family: "Saiyan Sans", sans-serif;
  font-size: 2rem;
  text-align: center;
  color: #fff200; /* Amarillo fuerte */

  /* Contorno oscuro grueso alrededor */
  text-shadow: -2px -2px 0 #8b0000, 2px -2px 0 #8b0000, -2px 2px 0 #8b0000,
    2px 2px 0 #8b0000, 0px 0px 8px #cc6600; /* brillo naranja difuminado externo */
}

.dragon-ball-text {
  font-family: "Saiyan Sans", sans-serif;
}

.no-select {
  -webkit-user-select: none; /* No seleccionar texto Safari/iOS */
  -moz-user-select: none; /* No seleccionar texto Firefox */
  -ms-user-select: none; /* No seleccionar texto IE/Edge */
  user-select: none; /* No seleccionar texto estándar */

  -webkit-user-drag: none; /* No arrastrar imágenes Safari/iOS */
}
</style>
