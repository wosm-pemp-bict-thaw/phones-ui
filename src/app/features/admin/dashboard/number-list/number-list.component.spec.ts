import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberListComponent } from './number-list.component';
import { NumberService } from '../services/number.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { TranslationService } from '@shared/services/translation.service';
import { PhoneNumber } from '@shared/interfaces/phone-number.interface';
import { signal, WritableSignal } from '@angular/core';

describe('NumberListComponent', () => {
  let component: NumberListComponent;
  let fixture: ComponentFixture<NumberListComponent>;
  let mockNumberService: jasmine.SpyObj<NumberService>;
  let mockToastr: jasmine.SpyObj<ToastrService>;
  let mockTranslationService: jasmine.SpyObj<TranslationService>;

  let numbersSignal: WritableSignal<PhoneNumber[]>;
  let currentFilterSignal: WritableSignal<'all' | 'active' | 'inactive'>;

  const mockNumbers: PhoneNumber[] = [
    { id: 1, number: '+123456789', messages: 5, status: 'active' },
    { id: 2, number: '+987654321', messages: 2, status: 'inactive' },
  ];

  beforeEach(async () => {
    numbersSignal = signal(mockNumbers);
    currentFilterSignal = signal('all');

    mockNumberService = jasmine.createSpyObj('NumberService', ['toggleStatus'], {
      numbers: numbersSignal,
    });

    mockToastr = jasmine.createSpyObj('ToastrService', ['success']);
    mockTranslationService = jasmine.createSpyObj('TranslationService', ['translate']);

    await TestBed.configureTestingModule({
      imports: [NumberListComponent, TranslatePipe],
      providers: [
        { provide: NumberService, useValue: mockNumberService },
        { provide: ToastrService, useValue: mockToastr },
        { provide: TranslationService, useValue: mockTranslationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberListComponent);
    component = fixture.componentInstance;

    component.currentFilter = currentFilterSignal;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize numbers on init', () => {
    component.ngOnInit();
    expect(component.numbers()).toEqual(mockNumbers);
  });

  it('should set sorting column and direction', () => {
    component.setSort('id');
    expect(component.sortColumn()).toBe('id');
    expect(component.sortDirection()).toBe('asc');

    component.setSort('id'); // Toggle direction
    expect(component.sortDirection()).toBe('desc');
  });

  it('should call toggleStatus and show a success toast', () => {
    const testNumber = mockNumbers[0];
    mockTranslationService.translate.and.callFake((key) => key);

    component.toggleStatus(testNumber);

    expect(mockNumberService.toggleStatus).toHaveBeenCalledWith(testNumber);
    expect(mockToastr.success).toHaveBeenCalledWith(
      'dashboard.ui.toast.statusChanged',
      'dashboard.ui.toast.success',
      { timeOut: 3000 }
    );
  });

  it('should track numbers by id', () => {
    const id = component.trackByNumber(0, mockNumbers[0]);
    expect(id).toBe(1);
  });
});
