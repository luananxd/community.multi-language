<script lang="ts" setup>
import { useLocale } from "~/composables/useLocale";
import type { CartRecord } from "@/types/catalog";

const locale = useLocale();

useHead({
  htmlAttrs: {
    lang: () => locale.language.value,
    dir: () => locale.langDir.value,
  },
});

const goods = ref<Record<string, number>>({});

const addGood = (record: CartRecord) => {
  if (goods.value[record.good]) {
    goods.value[record.good] += record.count;
  } else {
    goods.value[record.good] = record.count;
  }
};
</script>

<template>
  <div>
    <NuxtLayout name="default" :goods="goods">
      <NuxtPage @update:cart="addGood" />
    </NuxtLayout>
  </div>
</template>
