import i18next from "i18next";
import { getLanguageFromHeaders } from "#imports";

export const useLocale = () => {
  const DEFAULT_LANG = "en";
  const headers = useRequestHeaders(["accept-language"]);

  const cookiesLng = useCookie<string>("language", {
    maxAge: 60 * 60 * 24 * 365,
  });
  const headersLng = getLanguageFromHeaders(headers);
  const language = ref(cookiesLng.value ?? DEFAULT_LANG);

  if (headersLng && !cookiesLng.value) {
    cookiesLng.value = headersLng;
  } else {
    cookiesLng.value = language.value;
  }

  const langDir = computed(() => (language.value === "ar" ? "rtl" : "ltr"));

  const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
    cookiesLng.value = lang;
    language.value = lang;
  };

  return {
    language,
    langDir,
    changeLanguage,
  };
};
