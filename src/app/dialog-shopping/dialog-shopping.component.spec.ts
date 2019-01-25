import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShoppingComponent } from './dialog-shopping.component';

describe('DialogShoppingComponent', () => {
  let component: DialogShoppingComponent;
  let fixture: ComponentFixture<DialogShoppingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogShoppingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
