import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
  standalone: true,
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  isDarkTheme(): boolean {
    return this.themeService.getCurrentTheme() === 'dark';
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
