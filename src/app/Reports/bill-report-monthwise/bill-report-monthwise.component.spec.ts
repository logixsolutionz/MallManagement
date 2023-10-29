import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillReportMonthwiseComponent } from './bill-report-monthwise.component';

describe('BillReportMonthwiseComponent', () => {
  let component: BillReportMonthwiseComponent;
  let fixture: ComponentFixture<BillReportMonthwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillReportMonthwiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillReportMonthwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
