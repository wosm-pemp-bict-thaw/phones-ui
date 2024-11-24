import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: any = {};
  private currentLang: string = 'en';

  constructor(private http: HttpClient) {}

  loadTranslations(lang: string): Promise<void> {
    return this.http
      .get(`./assets/i18n/${lang}.json`)
      .toPromise()
      .then((data) => {
        this.translations = data;
        this.currentLang = lang;
      })
      .catch(() => {
        console.error(`Could not load translations for language: ${lang}`);
      });
  }

  translate(key: string): string {
    const keys = key.split('.');
    let result = this.translations;

    for (const k of keys) {
      result = result?.[k];
      if (!result) return key;
    }

    return result;
  }

  setLanguage(lang: string): Promise<void> {
    return this.loadTranslations(lang);
  }
}
