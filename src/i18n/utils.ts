import { labels, defaultLang } from "./ui";

export function useTranslations(
  lang: keyof typeof labels
): (key: string) => string {
  return function translate(key: string): string {
    const l = labels as Record<string, Record<string, string>>;
    return l[lang]?.[key] ?? l[defaultLang]?.[key] ?? key;
  };
}
