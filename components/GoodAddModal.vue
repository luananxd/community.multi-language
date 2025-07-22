<script lang="ts" setup>
import { useTranslation } from "i18next-vue";
import type { Good, CartRecord } from "~/types/catalog";
import { formatCurrency } from "#imports";
import type { Currency } from "~/types/common";

const visible = defineModel<boolean>("visible", { default: false });

const { t } = useTranslation();
const language = useCookie("language");

const props = defineProps<{
  good: Good | null;
}>();

const emit = defineEmits<{
  (e: "add:good", record: CartRecord): void;
}>();

const goodPrice = computed(() => {
  const currency = getCurrencyByLocale(
    language.value ?? ""
  )?.toLowerCase() as Currency;

  if (!currency) return 0;

  return props.good?.price[currency];
});

const addToCart = (good: Good | null, count: number) => {
  if (!good) return;

  const record = {
    good: JSON.stringify(good),
    count,
  };

  emit("add:good", record);
  visible.value = false;
};
</script>

<template>
  <div
    v-if="visible"
    class="good-add-modal"
    @click.self="() => (visible = false)"
  >
    <div class="good-add-modal__body">
      <h2 class="good-add-modal__title">{{ t("main:addToCart") }}</h2>

      <ul class="good-add-modal__variants">
        <li class="good-add-modal__variant" @click="addToCart(props.good, 1)">
          <div class="good-add-modal__count">
            {{
              t("main:addItem", {
                unit: props.good?.unit ?? "pieces",
                count: 1,
                context: "vp",
              })
            }}
          </div>
          <div class="good-add-modal__price">
            {{ formatCurrency(goodPrice ?? 0) }}
          </div>
        </li>

        <li class="good-add-modal__variant" @click="addToCart(props.good, 5)">
          <div class="good-add-modal__count">
            {{
              t("main:addItem", {
                unit: props.good?.unit ?? "pieces",
                count: 5,
                context: "vp",
              })
            }}
          </div>
          <div class="good-add-modal__price">
            {{ formatCurrency((goodPrice ?? 0) * 5) }}
          </div>
        </li>

        <li class="good-add-modal__variant" @click="addToCart(props.good, 10)">
          <div class="good-add-modal__count">
            {{
              t("main:addItem", {
                unit: props.good?.unit ?? "pieces",
                count: 10,
                context: "vp",
              })
            }}
          </div>
          <div class="good-add-modal__price">
            {{ formatCurrency((goodPrice ?? 0) * 10) }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.good-add-modal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
}

.good-add-modal__body {
  width: 600px;
  padding: 24px;
  background-color: var(--background-fill);
}

.good-add-modal__title {
  margin: 0 0 24px 0;
  cursor: default;
}

.good-add-modal__variants {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.good-add-modal__variant {
  padding: 16px;
  background-color: #ececec;
  cursor: pointer;
}

.good-add-modal__count {
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 700;
}

.good-add-modal__price {
  width: fit-content;
  padding: 4px 16px;
  background-color: var(--primary);
  border-radius: 99px;
}
</style>
