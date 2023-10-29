import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillReportMnthPartyWiseComponent } from './bill-report-mnth-party-wise.component';

describe('BillReportMnthPartyWiseComponent', () => {
  let component: BillReportMnthPartyWiseComponent;
  let fixture: ComponentFixture<BillReportMnthPartyWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillReportMnthPartyWiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillReportMnthPartyWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
