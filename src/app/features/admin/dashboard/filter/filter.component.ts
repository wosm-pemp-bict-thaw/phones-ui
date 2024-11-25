import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  @Output() statusChange = new EventEmitter<'all' | 'active' | 'inactive'>();

  onFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.statusChange.emit(
      selectElement.value as 'all' | 'active' | 'inactive'
    );
  }
}
