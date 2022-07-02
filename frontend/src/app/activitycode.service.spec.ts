import { TestBed } from '@angular/core/testing';

import { ActivitycodeService } from './activitycode.service';

describe('ActivitycodeService', () => {
  let service: ActivitycodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitycodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
