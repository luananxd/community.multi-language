export const useClientReady = () => {
  const ready = ref(false);

  onMounted(() => {
    // Симуляция задержки ответа сервера
    setTimeout(() => {
      ready.value = true;
    }, 1000);
  });

  return ready;
};
