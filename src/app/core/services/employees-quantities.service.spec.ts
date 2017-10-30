import { TestBed, inject } from '@angular/core/testing';

import { EmployeesQuantitiesService } from './employees-quantities.service';

describe('EmployeesQuantitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeesQuantitiesService]
    });
  });

  it('should be created', inject([EmployeesQuantitiesService], (service: EmployeesQuantitiesService) => {
    expect(service).toBeTruthy();
  }));
});
