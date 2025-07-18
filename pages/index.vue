<script lang="ts" setup>
import mockGoods from "../public/mock-goods.json";
import { ref } from "vue";
import { useTranslation } from "i18next-vue";
import type { Good, CartRecord } from "~/types/catalog";
// Components
import GoodCard from "~/components/GoodCard.vue";
import GoodAddModal from "~/components/GoodAddModal.vue";

const { t } = useTranslation();

useHead({
  title: () => t("main:pageTitle"),
});

const props = defineProps<{
  cart: number;
}>();

const emit = defineEmits<{
  (e: "update:cart", value: CartRecord): void;
}>();

const showGoodAddModal = ref(false);
const goodForAdding = ref<Good | null>(null);

const goods = ref<Good[]>(mockGoods);

const handleGoodClick = (good: Good) => {
  goodForAdding.value = good;
  showGoodAddModal.value = true;
};
</script>

<template>
  <ul class="main__list">
    <GoodCard
      v-for="good in goods"
      :key="good.id"
      :good="good"
      @click:good="handleGoodClick"
    />
  </ul>

  <GoodAddModal
    v-model:visible="showGoodAddModal"
    :good="goodForAdding"
    @add:good="(v) => emit('update:cart', v)"
  />
</template>

<style scoped>
.main__list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
