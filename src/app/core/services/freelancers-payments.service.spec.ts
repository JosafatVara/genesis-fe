import { TestBed, inject } from '@angular/core/testing';

import { FreelancersPaymentsService } from './freelancers-payments.service';

describe('FreelancersPaymentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FreelancersPaymentsService]
    });
  });

  it('should be created', inject([FreelancersPaymentsService], (service: FreelancersPaymentsService) => {
    expect(service).toBeTruthy();
  }));
});
