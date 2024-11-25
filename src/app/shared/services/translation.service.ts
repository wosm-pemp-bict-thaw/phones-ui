import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AVAILABLE_LANGUAGES_DICT, Langs } from '../constants/langs.enum';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: any = {};
  private currentLangSignal: WritableSignal<Langs> = signal(Langs.en);

  constructor(private http: HttpClient) {
    this.updateTextDirection(Langs.en);
  }

  loadTranslations(lang: Langs): Promise<void> {
    return this.http
      .get(`./assets/i18n/${lang}.json`)
      .toPromise()
      .then((data) => {
        this.translations = data;
        this.updateTextDirection(lang);
        this.currentLangSignal.set(lang);
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
    let result = this.translations;

    for (const k of keys) {
      result = result?.[k];
      if (!result) return key;
    }

    return result;
  }

  setLanguage(lang: Langs): Promise<void> {
    return this.loadTranslations(lang);
  }

  private updateTextDirection(lang: Langs): void {
    const isRtl = lang === Langs.ar;
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }
}
