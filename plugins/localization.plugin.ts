import i18next from "i18next";
import I18NextVue from "i18next-vue";
import I18NextHttpBackend from "i18next-http-backend";

export default defineNuxtPlugin((nuxtApp) => {
  const language = useCookie("language", {
    maxAge: 60 * 60 * 24 * 365,
  });

  if (!language.value) {
    language.value = "en";
  }

  i18next.use(I18NextHttpBackend).init({
    lng: language.value,
    fallbackLng: "en",
    supportedLngs: ["en", "ru", "ar"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      allowMultiLoading: true,
    },
    ns: ["main", "header", "formats", "units"],
    interpolation: {
      escapeValue: false,
    },
  });

  nuxtApp.vueApp.use(I18NextVue, { i18next });

  i18next.changeLanguage(language.value);
});
