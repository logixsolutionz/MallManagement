import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTransactionRptComponent } from './daily-transaction-rpt.component';

describe('DailyTransactionRptComponent', () => {
  let component: DailyTransactionRptComponent;
  let fixture: ComponentFixture<DailyTransactionRptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyTransactionRptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyTransactionRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
