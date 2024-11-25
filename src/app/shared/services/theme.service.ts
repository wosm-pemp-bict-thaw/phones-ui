import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeKey = 'theme';

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    const isDark = this.getCurrentTheme() === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  private setTheme(theme: 'light' | 'dark'): void {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(this.themeKey, theme);
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey) as 'light' | 'dark' | null;
    const defaultTheme = savedTheme || 'light';
    this.setTheme(defaultTheme);
  }

  getCurrentTheme(): 'light' | 'dark' {
    return document.documentElement.getAttribute('data-bs-theme') as 'light' | 'dark';
  }
}
