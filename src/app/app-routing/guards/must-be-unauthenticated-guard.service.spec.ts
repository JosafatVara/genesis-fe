import { TestBed, inject } from '@angular/core/testing';

import { MustBeUnauthenticatedGuardService } from './must-be-unauthenticated-guard.service';

describe('MustBeUnauthenticatedGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MustBeUnauthenticatedGuardService]
    });
  });

  it('should be created', inject([MustBeUnauthenticatedGuardService], (service: MustBeUnauthenticatedGuardService) => {
    expect(service).toBeTruthy();
  }));
});
