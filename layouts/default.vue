<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps<{
  goods: Record<string, number>;
}>();
</script>

<template>
  <AppHeader :goods="goods" />
  <main>
    <slot />
  </main>
  <AppFooter />
</template>

<style scoped>
main {
  padding: 40px 80px 40px 80px;
}
</style>
