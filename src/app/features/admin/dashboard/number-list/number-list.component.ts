import { Component, computed, Input, OnInit, Signal, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberService } from '../services/number.service';
import { PhoneNumber } from '../../../../shared/interfaces/phone-number.interface';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from '../../../../shared/services/translation.service';

@Component({
  selector: 'app-number-list',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './number-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberListComponent implements OnInit {
  numbers!: Signal<PhoneNumber[]>; 
  sortColumn = signal<'id' | 'number' | 'messages' | ''>('');
  sortDirection = signal<'asc' | 'desc'>('asc');
  
  sortedNumbers = computed(() => {
    const column = this.sortColumn();
    const direction = this.sortDirection();
    const numbers = this.filteredNumbers();

    if (!column) return numbers;

    const sorted = [...numbers].sort((a, b) => {
      if (a[column] < b[column]) {
        return direction === 'asc' ? -1 : 1;
      } else if (a[column] > b[column]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  });

  constructor(
    private toastr: ToastrService,
    private translate: TranslationService,
    private numberService: NumberService
  ) {}

  ngOnInit(): void {
    this.numbers = this.numberService.numbers;
  }


  @Input() currentFilter!: Signal<'all' | 'active' | 'inactive'>;

  filteredNumbers = computed(() => {
    const filter = this.currentFilter();
    const numbers = this.numbers();
    if (filter === 'all') {
      return numbers;
    } else {
      return numbers.filter((num) => num.status === filter);
    }
  });

  toggleStatus(number: PhoneNumber): void {
    this.numberService.toggleStatus(number);

    const title = this.translate.translate('dashboard.ui.toast.success');
    const message = this.translate.translate('dashboard.ui.toast.statusChanged');
  
    this.toastr.success(message, title, {
      timeOut: 3000,
    });
  }

  setSort(column: 'id' | 'number' | 'messages'): void {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  trackByNumber(index: number, number: PhoneNumber): number {
    return number.id;
  }
}
