import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { NumberService } from '../services/number.service';
import { FilterComponent } from '../filter/filter.component';
import { NumberListComponent } from '../number-list/number-list.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { WritableSignal, signal } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockNumberService: Partial<NumberService>;

  // Mock сигналы для тестов
  let loadingStateSignal: WritableSignal<'loading' | 'success' | 'error'>;

  beforeEach(async () => {
    // Инициализация mock сигналов
    loadingStateSignal = signal<'loading' | 'success' | 'error'>('loading');

    // Mock NumberService
    mockNumberService = {
      loadingState: () => loadingStateSignal.asReadonly(),
      loadNumbersFromServer: jasmine.createSpy('loadNumbersFromServer'),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, FilterComponent, NumberListComponent],
      declarations: [DashboardComponent],
      providers: [{ provide: NumberService, useValue: mockNumberService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadNumbersFromServer on initialization', () => {
    // Act
    fixture.detectChanges();

    // Assert
    expect(mockNumberService.loadNumbersFromServer).toHaveBeenCalled();
  });

  it('should display loading state correctly', () => {
    // Arrange
    loadingStateSignal.set('loading');
    fixture.detectChanges();

    // Act
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    const loadingText = fixture.debugElement.query(By.css('.text-muted'));

    // Assert
    expect(spinner).toBeTruthy();
    expect(loadingText.nativeElement.textContent).toContain('Loading data...');
  });

  it('should display success state correctly', () => {
    // Arrange
    loadingStateSignal.set('success');
    fixture.detectChanges();

    // Act
    const filterComponent = fixture.debugElement.query(By.directive(FilterComponent));
    const numberListComponent = fixture.debugElement.query(By.directive(NumberListComponent));

    // Assert
    expect(filterComponent).toBeTruthy();
    expect(numberListComponent).toBeTruthy();
  });

  it('should display error state correctly', () => {
    // Arrange
    loadingStateSignal.set('error');
    fixture.detectChanges();

    // Act
    const errorText = fixture.debugElement.query(By.css('.text-danger'));
    const retryButton = fixture.debugElement.query(By.css('button.btn-primary'));

    // Assert
    expect(errorText.nativeElement.textContent).toContain('Failed to load data. Please try again later.');
    expect(retryButton).toBeTruthy();
  });

  it('should call retry method when Retry button is clicked', () => {
    // Arrange
    loadingStateSignal.set('error');
    fixture.detectChanges();
    spyOn(component, 'retry');

    // Act
    const retryButton = fixture.debugElement.query(By.css('button.btn-primary'));
    retryButton.nativeElement.click();

    // Assert
    expect(component.retry).toHaveBeenCalled();
  });

  it('should update currentFilter when onStatusChange is called', () => {
    // Act
    component.onStatusChange('active');

    // Assert
    expect(component.currentFilter()).toBe('active');
  });
});
