import i18next from "i18next";

export const getCurrencyByLocale = (locale: string) => {
  if (locale === "en") return "USD";
  if (locale === "ru") return "RUB";
  if (locale === "ar") return "AED";
};

export const formatDate = (value: Date) => {
  return i18next.t("formats:date", {
    value,
    formatParams: {
      value: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      },
    },
  });
};

export const formatCurrency = (value: number) => {
  return i18next.t("formats:money", {
    value,
    formatParams: {
      value: {
        currency: getCurrencyByLocale(i18next.language),
      },
    },
  });
};
