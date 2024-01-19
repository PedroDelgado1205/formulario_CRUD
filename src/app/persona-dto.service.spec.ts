import { TestBed } from '@angular/core/testing';

import { PersonaDtoService } from './persona-dto.service';

describe('PersonaDtoService', () => {
  let service: PersonaDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
