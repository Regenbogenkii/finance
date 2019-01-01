import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdStockComponent } from './household-stock.component';

describe('HouseholdStockComponent', () => {
  let component: HouseholdStockComponent;
  let fixture: ComponentFixture<HouseholdStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseholdStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
