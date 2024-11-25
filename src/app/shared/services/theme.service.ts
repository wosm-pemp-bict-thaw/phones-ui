import { Injectable } from '@angular/core';
import { Themes } from '../constants/themes.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeKey = 'theme';

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    const isDark = this.getCurrentTheme() === Themes.DARK;
    const newTheme = isDark ? Themes.LIGHT : Themes.DARK;
    this.setTheme(newTheme);
  }

  private setTheme(theme: Themes): void {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(this.themeKey, theme);
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey) as Themes | null;
    const defaultTheme = savedTheme || Themes.LIGHT;
    this.setTheme(defaultTheme);
  }

  getCurrentTheme(): Themes.DARK | Themes.LIGHT {
    return document.documentElement.getAttribute('data-bs-theme') as Themes.DARK | Themes.LIGHT;
  }
}
