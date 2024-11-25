import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AVAILABLE_LANGUAGES_DICT, Langs } from '../constants/langs.enum';
import { Translations } from '../interfaces/translations.interface';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: Translations = {};
  private currentLangSignal: WritableSignal<Langs>;

  constructor(private http: HttpClient) {
    const savedLang = this.getSavedLanguage();
    this.currentLangSignal = signal(savedLang);
    this.setLanguage(savedLang);
  }

  loadTranslations(lang: Langs): Promise<void> {
    return this.http
      .get<Translations>(`./assets/i18n/${lang}.json`)
      .toPromise()
      .then((data) => {
        if (data) {
          this.translations = data;
          this.updateTextDirection(lang);
          console.log('Translations loaded for language:', lang);
          this.currentLangSignal.set(lang);
          this.saveLanguage(lang);
        } else {
          console.error('No translations found for language:', lang);
        }
      })
      .catch(() => {
        console.error(`Could not load translations for language: ${lang}`);
      });
  }

  get currentLang() {
    return this.currentLangSignal.asReadonly();
  }

  currentLangDetails = computed(
    () => AVAILABLE_LANGUAGES_DICT[this.currentLangSignal()]
  );

  translate(key: string): string {
    const keys = key.split('.');
    let result: string | Translations | undefined = this.translations;

    for (const k of keys) {
      if (typeof result === 'object' && result) {
        result = result[k];
      } else {
        return key;
      }
    }

    return typeof result === 'string' ? result : key;
  }

  setLanguage(lang: Langs): Promise<void> {
    return this.loadTranslations(lang);
  }

  private updateTextDirection(lang: Langs): void {
    const isRtl = lang === Langs.ar;
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }

  private getSavedLanguage(): Langs {
    const savedLang = localStorage.getItem('language') as Langs | null;
    return savedLang && Object.values(Langs).includes(savedLang)
      ? savedLang
      : Langs.en; // Fallback to English
  }

  private saveLanguage(lang: Langs): void {
    localStorage.setItem('language', lang);
  }
}
