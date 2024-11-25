import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './features/admin/dashboard/dashboard/dashboard.component';
import { TranslationService } from './shared/services/translation.service';
import { TranslatePipe } from './shared/pipes/translate.pipe';
import { LanguageSwitcherComponent } from './shared/components/language-switcher/language-switcher.component';
import { Langs } from './shared/constants/langs.enum';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';
import { ThemeService } from './shared/services/theme.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, LanguageSwitcherComponent, ThemeToggleComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  isAuthenticated = this.authService.isAuthenticated;

  constructor(
    private translationService: TranslationService,
  ) {}

  
  ngOnInit() {
    this.translationService.loadTranslations(Langs.en);
  }
}
