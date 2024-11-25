import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';
import { Langs, LangNames, LangIcons } from '../../constants/langs.enum';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class NavbarComponent {
  private themeService = inject(ThemeService);
  private router = inject(Router);
  private translate = inject(TranslationService);
  private authService = inject(AuthService);

  isAuthenticated = computed(() => this.authService.isAuthenticated());
  isDarkTheme = this.themeService.getCurrentTheme;

  availableLanguages = [
    { code: Langs.en, name: LangNames.en, flag: LangIcons.en },
    { code: Langs.ar, name: LangNames.ar, flag: LangIcons.ar },
    { code: Langs.ru, name: LangNames.ru, flag: LangIcons.ru },
    { code: Langs.zh, name: LangNames.zh, flag: LangIcons.zh },
  ];

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  changeLanguage(lang: string): void {
    this.translate.setLanguage(lang);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
