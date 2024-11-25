import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';
import { Langs, AVAILABLE_LANGUAGES } from '../../constants/langs.enum';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, TranslatePipe],
  standalone: true,
})
export class NavbarComponent {
  private themeService = inject(ThemeService);
  private router = inject(Router);
  private translate = inject(TranslationService);
  private authService = inject(AuthService);

  isAuthenticated = computed(() => this.authService.isAuthenticated());
  currentTheme = this.themeService.getCurrentTheme;
  currentLang = this.translate.currentLang;
  availableLanguages = AVAILABLE_LANGUAGES;
  currentLangDetails = this.translate.currentLangDetails;

  toggleDropdown(event: Event): void {
    const element = event.target as HTMLElement;
    const dropdown = element.closest('.dropdown');
    if (dropdown) {
      dropdown.classList.toggle('show');
      const menu = dropdown.querySelector('.dropdown-menu') as HTMLElement;
      if (menu) {
        menu.classList.toggle('show');
      }
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  changeLanguage(lang: Langs): void {
    this.translate.setLanguage(lang);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
