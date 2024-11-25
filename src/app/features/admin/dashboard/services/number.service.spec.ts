import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NumberService } from './number.service';
import { environment } from '@environments/environment';
import { PhoneNumber } from '@shared/interfaces/phone-number.interface';

describe('NumberService', () => {
  let service: NumberService;
  let httpMock: HttpTestingController;

  const mockNumbers: PhoneNumber[] = [
    { id: 1, number: '+123456789', messages: 5, status: 'active' },
    { id: 2, number: '+987654321', messages: 2, status: 'inactive' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NumberService],
    });

    service = TestBed.inject(NumberService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load numbers from server successfully', () => {
    service.loadNumbersFromServer();

    expect(service.loadingState()).toBe('loading');

    const req = httpMock.expectOne(`${environment.apiUrl}/phone-info`);
    expect(req.request.method).toBe('GET');
    req.flush(mockNumbers);

    expect(service.loadingState()).toBe('success');
    expect(service.numbers()).toEqual(mockNumbers);
  });

  it('should handle error when loading numbers from server', () => {
    service.loadNumbersFromServer();

    expect(service.loadingState()).toBe('loading');

    const req = httpMock.expectOne(`${environment.apiUrl}/phone-info`);
    req.error(new ErrorEvent('Network error'));

    expect(service.loadingState()).toBe('error');
    expect(service.numbers()).toEqual([]);
  });

  it('should toggle status of a phone number', () => {
    service['numbersSignal'].set(mockNumbers);

    const numberToToggle = mockNumbers[0]; // +123456789

    service.toggleStatus(numberToToggle);

    const updatedNumbers = service.numbers();
    expect(updatedNumbers[0].status).toBe('inactive');
    expect(updatedNumbers[1].status).toBe('inactive');
  });

  it('should return readonly signals for numbers and loadingState', () => {
    expect(service.numbers()).toEqual([]);
    expect(service.loadingState()).toBe('idle');
  });
});
