<script lang="ts" setup>
import { useTranslation } from "i18next-vue";
import type { Good, CartRecord } from "@/types/catalog";
import type { Currency } from "@/types/common";
import {
  formatDate,
  formatCurrency,
  getCurrencyByLocale,
} from "@/utils/localize-helpers";

const { i18next, t } = useTranslation();
const language = useCookie("language");

useHead({
  htmlAttrs: {
    lang: () => language.value,
    dir: () => (language.value === "ar" ? "rtl" : "ltr"),
  },
});

const goods = ref<Record<string, number>>({});

const cart = computed(() => {
  let sum = 0;

  for (const [good, count] of Object.entries(goods.value)) {
    const _good: Good = JSON.parse(good);
    const currency = getCurrencyByLocale(
      language.value ?? ""
    )?.toLowerCase() as Currency;

    if (!currency) return 0;

    sum += _good.price[currency] * count;
  }

  return sum;
});

const addGood = (record: CartRecord) => {
  if (goods.value[record.good]) {
    goods.value[record.good] += record.count;
  } else {
    goods.value[record.good] = record.count;
  }
};

const changeLanguage = (language: string) => {
  i18next.changeLanguage(language);

  const lang = useCookie("language", {
    maxAge: 60 * 60 * 24 * 365,
  });
  lang.value = language;
};
</script>

<template>
  <div>
    <header class="header">
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

    <main class="main">
      <NuxtPage :cart="cart" @update:cart="addGood" />
    </main>

    <footer class="footer">
      <button
        class="footer__button"
        :class="{ active: language === 'en' }"
        type="button"
        @click="changeLanguage('en')"
      >
        English
      </button>
      <button
        class="footer__button"
        :class="{ active: language === 'ru' }"
        type="button"
        @click="changeLanguage('ru')"
      >
        Русский
      </button>
      <button
        class="footer__button"
        :class="{ active: language === 'ar' }"
        type="button"
        @click="changeLanguage('ar')"
      >
        عربي
      </button>
    </footer>
  </div>
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

.main {
  padding: 40px 80px 40px 80px;
}

.footer {
  padding: 16px 80px;
  background-color: var(--background-secondary);
}

.footer__button {
  min-width: 100px;
  padding: 4px 16px;
  color: var(--text-alt);
  font-size: 16px;
  background-color: black;
  border: 3px solid transparent;
  border-radius: 16px;
  cursor: pointer;
}

.footer__button.active {
  border-color: var(--primary);
}
</style>
