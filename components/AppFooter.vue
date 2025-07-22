<script lang="ts" setup>
import { useLocale } from "~/composables/useLocale";
import { useClientReady } from "~/composables/useClientReady";

const locale = useLocale();
const ready = useClientReady();
</script>

<template>
  <footer v-if="!ready" class="footer-skeleton">
    <div class="footer-skeleton__button skeleton"></div>
    <div class="footer-skeleton__button skeleton"></div>
    <div class="footer-skeleton__button skeleton"></div>
  </footer>

  <footer v-else class="footer">
    <button
      class="footer__button"
      :class="{ active: locale.language.value === 'en' }"
      type="button"
      @click="locale.changeLanguage('en')"
    >
      English
    </button>
    <button
      class="footer__button"
      :class="{ active: locale.language.value === 'ru' }"
      type="button"
      @click="locale.changeLanguage('ru')"
    >
      Русский
    </button>
    <button
      class="footer__button"
      :class="{ active: locale.language.value === 'ar' }"
      type="button"
      @click="locale.changeLanguage('ar')"
    >
      عربي
    </button>
  </footer>
</template>

<style scoped>
.footer {
  padding: 16px 80px;
  background-color: var(--background-secondary);
}

.footer__button {
  min-width: 100px;
  padding: 4px 16px;
  color: var(--text-alt);
  font-size: 16px;
  background-color: var(--text);
  border: 3px solid transparent;
  border-radius: 16px;
  cursor: pointer;
}

.footer__button.active {
  border-color: var(--primary);
}

.footer-skeleton {
  display: flex;
  align-items: center;
  padding: 16px 80px;
  background-color: var(--background-secondary);
}

.footer-skeleton__button {
  min-width: 100px;
  height: 32px;
  border-radius: 16px;
}
</style>
