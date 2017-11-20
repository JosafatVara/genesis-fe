import { TestBed, inject } from '@angular/core/testing';

import { MonthSelectorService } from './month-selector.service';

describe('MonthSelectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonthSelectorService]
    });
  });

  it('should be created', inject([MonthSelectorService], (service: MonthSelectorService) => {
    expect(service).toBeTruthy();
  }));
});
