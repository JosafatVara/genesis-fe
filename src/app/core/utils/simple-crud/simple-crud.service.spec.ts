import { TestBed, inject } from '@angular/core/testing';

import { SimpleCrudService } from './simple-crud.service';

describe('SimpleCrudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimpleCrudService]
    });
  });

  it('should be created', inject([SimpleCrudService], (service: SimpleCrudService) => {
    expect(service).toBeTruthy();
  }));
});
