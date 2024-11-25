import { TestBed } from '@angular/core/testing';

import { TranslationService } from './translation.service';
import { HttpClientModule } from '@angular/common/http';

describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(TranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
