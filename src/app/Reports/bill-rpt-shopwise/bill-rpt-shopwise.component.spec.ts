import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillRptShopwiseComponent } from './bill-rpt-shopwise.component';

describe('BillRptShopwiseComponent', () => {
  let component: BillRptShopwiseComponent;
  let fixture: ComponentFixture<BillRptShopwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillRptShopwiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillRptShopwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
