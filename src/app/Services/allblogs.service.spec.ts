// All blogs spec file

import { TestBed } from '@angular/core/testing';

import { AllblogsService } from './allblogs.service';

describe('AllblogsService', () => {
  let service: AllblogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllblogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
