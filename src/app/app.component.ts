import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './features/admin/dashboard/dashboard/dashboard.component';
import { TranslationService } from './shared/services/translation.service';
import { TranslatePipe } from './shared/pipes/translate.pipe';
import { LanguageSwitcherComponent } from './shared/components/language-switcher/language-switcher.component';
import { Langs } from './shared/constants/langs.enum';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardComponent, TranslatePipe, LanguageSwitcherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent implements OnInit {
  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.translationService.loadTranslations(Langs.en);
  }
}
