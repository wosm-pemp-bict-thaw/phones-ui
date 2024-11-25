export enum Langs {
  en = 'en',
  ru = 'ru',
  ar = 'ar',
  zh = 'zh',
}

export enum LangNames {
  en = 'English',
  ru = 'Русский',
  ar = 'عربي',
  zh = '中国人',
}

export enum LangIcons {
  en = '🇬🇧',
  ru = '🇷🇺',
  ar = '🇸🇦',
  zh = '🇨🇳',
}

export const AVAILABLE_LANGUAGES = [
  { code: Langs.en, name: LangNames.en, flag: LangIcons.en },
  { code: Langs.ar, name: LangNames.ar, flag: LangIcons.ar },
  { code: Langs.ru, name: LangNames.ru, flag: LangIcons.ru },
  { code: Langs.zh, name: LangNames.zh, flag: LangIcons.zh },
];

export const AVAILABLE_LANGUAGES_DICT: Record<
  Langs,
  { code: Langs; name: string; flag: string }
> = {
  [Langs.en]: { code: Langs.en, name: LangNames.en, flag: LangIcons.en },
  [Langs.ar]: { code: Langs.ar, name: LangNames.ar, flag: LangIcons.ar },
  [Langs.ru]: { code: Langs.ru, name: LangNames.ru, flag: LangIcons.ru },
  [Langs.zh]: { code: Langs.zh, name: LangNames.zh, flag: LangIcons.zh },
};
