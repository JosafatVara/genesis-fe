import { TestBed, inject } from '@angular/core/testing';

import { AffiliationsService } from './affiliations.service';

describe('AffiliationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AffiliationsService]
    });
  });

  it('should be created', inject([AffiliationsService], (service: AffiliationsService) => {
    expect(service).toBeTruthy();
  }));
});
