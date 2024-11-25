import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';
import { AVAILABLE_LANGUAGES, Langs } from '../../constants/langs.enum';

@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css',
  standalone: true
})
export class LanguageSwitcherComponent {
  isMenuOpen = false;
  availableLanguages = AVAILABLE_LANGUAGES;

  constructor(private translate: TranslationService) {}

  toggleLanguageMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  changeLanguage(lang: Langs): void {
    this.translate.setLanguage(lang);
    this.isMenuOpen = false;
  }
}
