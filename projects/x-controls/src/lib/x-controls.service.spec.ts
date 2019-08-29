import { TestBed } from '@angular/core/testing';

import { XControlsService } from './x-controls.service';

describe('XControlsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XControlsService = TestBed.get(XControlsService);
    expect(service).toBeTruthy();
  });
});
