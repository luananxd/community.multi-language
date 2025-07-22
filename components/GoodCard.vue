<script lang="ts" setup>
import placeholderImage from "@/assets/images/placeholder.webp";
// Types
import type { Good } from "~/types/catalog";
import type { Locale } from "~/types/common";
// Composables
import { useTranslation } from "i18next-vue";
import { useClientReady } from "#imports";

const { i18next, t } = useTranslation();
const ready = useClientReady();

const props = defineProps<{
  good: Good;
}>();

const emit = defineEmits<{
  (e: "click:good", good: Good): void;
}>();
</script>

<template>
  <li v-if="!ready" class="skeleton-item">
    <img :src="placeholderImage" class="item__image" width="300" height="300" />
    <div class="skeleton-item__information">
      <div class="skeleton-item__name skeleton"></div>
      <div class="skeleton-item__description">
        <div class="skeleton-item__text skeleton"></div>
        <div class="skeleton-item__text skeleton"></div>
        <div class="skeleton-item__text skeleton"></div>
        <div class="skeleton-item__text skeleton"></div>
      </div>
      <hr />
      <div class="skeleton-item__buttons">
        <div class="skeleton-item__button skeleton"></div>
      </div>
    </div>
  </li>

  <li v-else class="item">
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
  height: 300px;
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
  grid-column: 1 / -1;
  padding: 4px 16px;
  font-size: 16px;
  color: var(--text-alt);
  background-color: var(--accent);
  border: none;
  border-radius: 16px;
  cursor: pointer;
}

.skeleton-item {
  display: flex;
  flex-direction: column;
  background-color: var(--background-fill);
}

.skeleton-item__image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.skeleton-item__information {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
}

.skeleton-item__information hr {
  margin: 0;
}

.skeleton-item__name {
  margin: 0;
  width: 65%;
  height: 28px;
}

.skeleton-item__description {
  flex-grow: 1;
  margin: 0;
}

.skeleton-item__text {
  height: 14px;
  margin: 3px 0;
}

.skeleton-item__text:last-child {
  width: 35%;
}

.skeleton-item__buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.skeleton-item__button {
  grid-column: 1 / -1;
  height: 26px;
  background-color: var(--accent);
  border: none;
  border-radius: 16px;
  cursor: pointer;
}

.skeleton-item__button-text {
  max-width: 100px;
  margin: 0 auto;
}
</style>
