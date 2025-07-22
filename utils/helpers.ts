export const getLanguageFromHeaders = (headers: Record<string, string>) => {
  return headers["accept-language"]?.split(";")?.[0]?.split("-")?.[0];
};
