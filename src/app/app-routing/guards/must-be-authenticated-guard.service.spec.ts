import { TestBed, inject } from '@angular/core/testing';

import { MustBeAuthenticatedGuardService } from './must-be-authenticated-guard.service';

describe('MustBeAuthenticatedGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MustBeAuthenticatedGuardService]
    });
  });

  it('should be created', inject([MustBeAuthenticatedGuardService], (service: MustBeAuthenticatedGuardService) => {
    expect(service).toBeTruthy();
  }));
});
