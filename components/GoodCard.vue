<script lang="ts" setup>
import { useTranslation } from "i18next-vue";
import type { Good } from "~/types/catalog";
import type { Locale } from "~/types/common";

const { i18next, t } = useTranslation();

const props = defineProps<{
  good: Good;
}>();

const emit = defineEmits<{
  (e: "click:good", good: Good): void;
}>();
</script>

<template>
  <li class="item">
    <img :src="props.good.img" class="item__image" width="300" height="300" />
    <div class="item__information">
      <h2 class="item__name">{{ props.good.title }}</h2>
      <p class="item__description">
        {{ props.good.description[i18next.language as Locale] }}
      </p>
      <hr />
      <div class="item__buttons">
        <button
          class="item__button"
          type="button"
          @click="emit('click:good', props.good)"
        >
          {{ t("main:addToCart") }}
        </button>
      </div>
    </div>
  </li>
</template>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  background-color: var(--background-fill);
}

.item__image {
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}

.item__information {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
}

.item__information hr {
  margin: 0;
}

.item__name {
  margin: 0;
}

.item__description {
  flex-grow: 1;
  margin: 0;
  font-size: 14px;
}

.item__buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.item__button {
  padding: 4px 16px;
  font-size: 16px;
  background-color: var(--background-secondary);
  border: none;
  border-radius: 16px;
  cursor: pointer;
}

.item__button:nth-child(1) {
  grid-column: 1 / -1;
  color: var(--text-alt);
  background-color: var(--accent);
}
</style>
