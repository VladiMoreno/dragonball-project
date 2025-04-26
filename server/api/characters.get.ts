export default defineEventHandler(async (event) => {
  console.log('VEAMOS SI ENTRA ETA MIERDA');
  const response = await $fetch('https://dragonball-api.com/api/characters?page=1&limit=5')

  console.log(response);
  return response
})
