import { TestBed, inject } from '@angular/core/testing';

import { FreelancersService } from './freelancers.service';

describe('FreelancersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FreelancersService]
    });
  });

  it('should be created', inject([FreelancersService], (service: FreelancersService) => {
    expect(service).toBeTruthy();
  }));
});
