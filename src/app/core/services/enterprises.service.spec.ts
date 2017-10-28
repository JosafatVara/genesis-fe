import { TestBed, inject } from '@angular/core/testing';

import { EnterprisesService } from './enterprises.service';

describe('EnterprisesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnterprisesService]
    });
  });

  it('should be created', inject([EnterprisesService], (service: EnterprisesService) => {
    expect(service).toBeTruthy();
  }));
});
