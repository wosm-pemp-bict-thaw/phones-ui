import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NumberService } from '../services/number.service';
import { FilterComponent } from '../filter/filter.component';
import { NumberListComponent } from '../number-list/number-list.component';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { HttpClientModule } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockNumberService: jasmine.SpyObj<NumberService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockNumberService = jasmine.createSpyObj('NumberService', ['loadNumbersFromServer', 'loadingState']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, DashboardComponent, FilterComponent, NumberListComponent, TranslatePipe],
      providers: [
        { provide: NumberService, useValue: mockNumberService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadNumbersFromServer on init', () => {
    component.ngOnInit();
    expect(mockNumberService.loadNumbersFromServer).toHaveBeenCalled();
  });

  it('should set isLoading correctly based on loadingState', () => {
    mockNumberService.loadingState.and.returnValue('loading');
    expect(component.isLoading()).toBeTrue();
    expect(component.hasError()).toBeFalse();
    expect(component.isSuccess()).toBeFalse();
  });

  it('should set hasError correctly based on loadingState', () => {
    mockNumberService.loadingState.and.returnValue('error');
    expect(component.isLoading()).toBeFalse();
    expect(component.hasError()).toBeTrue();
    expect(component.isSuccess()).toBeFalse();
  });

  it('should set isSuccess correctly based on loadingState', () => {
    mockNumberService.loadingState.and.returnValue('success');
    expect(component.isLoading()).toBeFalse();
    expect(component.hasError()).toBeFalse();
    expect(component.isSuccess()).toBeTrue();
  });

  it('should update currentFilter when onStatusChange is called', () => {
    const newStatus: 'all' | 'active' | 'inactive' = 'active';
    component.onStatusChange(newStatus);
    expect(component.currentFilter()).toBe(newStatus);
  });

  it('should call loadNumbersFromServer on retry', () => {
    component.retry();
    expect(mockNumberService.loadNumbersFromServer).toHaveBeenCalled();
  });

  it('should remove authToken and navigate to login on logout', () => {
    spyOn(localStorage, 'removeItem');
    component.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('authToken');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
