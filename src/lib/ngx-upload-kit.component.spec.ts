import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxUploadKitComponent } from './ngx-upload-kit.component';

describe('NgxUploadKitComponent', () => {
  let component: NgxUploadKitComponent;
  let fixture: ComponentFixture<NgxUploadKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxUploadKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxUploadKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
