import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAlertNoShoppingListComponent } from './dialog-alert-no-shopping-list.component';

describe('DialogAlertNoShoppingListComponent', () => {
  let component: DialogAlertNoShoppingListComponent;
  let fixture: ComponentFixture<DialogAlertNoShoppingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAlertNoShoppingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAlertNoShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
