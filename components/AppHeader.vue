<script lang="ts" setup>
import type { CartRecord, Good } from "~/types/catalog";
import type { Currency } from "~/types/common";
// Composables
import { useTranslation } from "i18next-vue";
import { useLocale } from "~/composables/useLocale";
import { useClientReady } from "~/composables/useClientReady";

const props = defineProps<{
  goods: Record<string, number>;
}>();

const ready = useClientReady();

const { t } = useTranslation();
const locale = useLocale();

const cart = computed(() => {
  let sum = 0;

  for (const [good, count] of Object.entries(props.goods)) {
    const _good: Good = JSON.parse(good);
    const currency = getCurrencyByLocale(
      locale.language.value ?? ""
    )?.toLowerCase() as Currency;

    if (!currency) return 0;

    sum += _good.price[currency] * count;
  }

  return sum;
});
</script>

<template>
  <header v-if="!ready" class="header-skeleton">
    <div class="header-skeleton__title skeleton"></div>
    <div class="header-skeleton__links">
      <div class="header-skeleton__link skeleton"></div>
      <div class="header-skeleton__link skeleton"></div>
      <div class="header-skeleton__today skeleton"></div>
      <div class="header-skeleton__cart skeleton"></div>
    </div>
  </header>

  <header v-else class="header">
    <h1 class="header__title">{{ t("mainTitle", { ns: "header" }) }}</h1>
    <div class="header__links">
      <a class="link header__link" href="tel:+79999999999">
        {{ t("header:callUs") }}
      </a>
      <a class="link header__link" href="mailto:luanan@yandex.ru">
        {{ t("header:emailUs") }}
      </a>
      <div>
        {{ t("header:todayIs") }}
        <time datetime="2025-07-14">
          {{ formatDate(new Date()) }}
        </time>
      </div>
      <div class="header__cart">
        {{ t("header:yourCart") }}
        {{ formatCurrency(cart) }}
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 80px;
  background-color: var(--primary);
}

.header__title {
  margin: 0;
}

.header__links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.header__cart {
  padding: 4px 16px;
  color: var(--text-alt);
  background-color: var(--accent);
  border-radius: 16px;
}

.header-skeleton {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 80px;
  background-color: var(--primary);
}

.header-skeleton__title {
  margin: 0;
  width: 220px;
  height: 37px;
}

.header-skeleton__links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.header-skeleton__link {
  width: 60px;
  height: 18px;
}

.header-skeleton__today {
  width: 150px;
  height: 18px;
}

.header-skeleton__cart {
  width: 150px;
  height: 26px;
  background-color: var(--accent);
  border-radius: 16px;
}
</style>
