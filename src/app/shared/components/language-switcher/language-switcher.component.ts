import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';
import { Langs, LangNames, LangIcons } from '../../constants/langs.enum';

@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
  isMenuOpen = false;
  availableLanguages = [
    { code: Langs.en, name: LangNames.en, flag: LangIcons.en },
    { code: Langs.ar, name: LangNames.ar, flag: LangIcons.ar },
    { code: Langs.ru, name: LangNames.ru, flag: LangIcons.ru },
    { code: Langs.zh, name: LangNames.zh, flag: LangIcons.zh },
  ];

  constructor(private translate: TranslationService) {}

  toggleLanguageMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  changeLanguage(lang: string): void {
    this.translate.setLanguage(lang);
    this.isMenuOpen = false;
  }
}
