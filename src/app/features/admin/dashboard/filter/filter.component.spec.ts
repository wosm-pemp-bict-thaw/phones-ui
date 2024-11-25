import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit statusChange with correct value when onFilterChange is called', () => {
    spyOn(component.statusChange, 'emit');

    const selectElement: HTMLSelectElement = fixture.debugElement.query(By.css('#statusFilter')).nativeElement;

    selectElement.value = 'active';
    selectElement.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(component.statusChange.emit).toHaveBeenCalledWith('active');
  });

  it('should emit "all" by default when onFilterChange is called', () => {
    spyOn(component.statusChange, 'emit');

    const selectElement: HTMLSelectElement = fixture.debugElement.query(By.css('#statusFilter')).nativeElement;

    selectElement.value = 'all';
    selectElement.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(component.statusChange.emit).toHaveBeenCalledWith('all');
  });

  it('should update the selected value when a new option is selected', () => {
    const selectElement: HTMLSelectElement = fixture.debugElement.query(By.css('#statusFilter')).nativeElement;

    selectElement.value = 'inactive';
    selectElement.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(selectElement.value).toBe('inactive');
  });
});
