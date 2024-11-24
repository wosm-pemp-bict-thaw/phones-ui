import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberListComponent } from '../number-list/number-list.component';
import { NumberService } from '../services/number.service';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NumberListComponent, FilterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
})
export class DashboardComponent implements OnInit {
  isLoading = computed(() => this.numberService.loadingState() === 'loading');
  hasError = computed(() => this.numberService.loadingState() === 'error');
  isSuccess = computed(() => this.numberService.loadingState() === 'success');

  currentFilter = signal<'all' | 'active' | 'inactive'>('all');

  constructor(private numberService: NumberService) {}
  ngOnInit(): void {
    this.numberService.loadNumbersFromServer();
  }

  onStatusChange(status: 'all' | 'active' | 'inactive'): void {
    this.currentFilter.set(status);
  }

  retry(): void {
    this.numberService.loadNumbersFromServer();
  }
}
