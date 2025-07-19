import i18next from "i18next";

export const useLocale = () => {
  const DEFAULT_LANG = "en";
  const language = useCookie<string>("language", {
    maxAge: 60 * 60 * 24 * 365,
  });

  const langDir = computed(() => (language.value === "ar" ? "rtl" : "ltr"));

  if (!language.value) {
    language.value = DEFAULT_LANG;
  }

  const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
    language.value = lang;
  };

  return {
    language,
    langDir,
    changeLanguage,
  };
};
