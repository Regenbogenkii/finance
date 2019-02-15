import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadPhotoAccountComponent } from './download-photo-account.component';

describe('DownloadPhotoAccountComponent', () => {
  let component: DownloadPhotoAccountComponent;
  let fixture: ComponentFixture<DownloadPhotoAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadPhotoAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadPhotoAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
