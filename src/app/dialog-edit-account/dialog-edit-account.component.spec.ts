import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditAccountComponent } from './dialog-edit-account.component';

describe('DialogEditAccountComponent', () => {
  let component: DialogEditAccountComponent;
  let fixture: ComponentFixture<DialogEditAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
