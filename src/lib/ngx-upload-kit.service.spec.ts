import { TestBed } from '@angular/core/testing';

import { NgxUploadKitService } from './ngx-upload-kit.service';

describe('NgxUploadKitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxUploadKitService = TestBed.get(NgxUploadKitService);
    expect(service).toBeTruthy();
  });
});
