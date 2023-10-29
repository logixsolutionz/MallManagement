import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillrptdatewiseComponent } from './billrptdatewise.component';

describe('BillrptdatewiseComponent', () => {
  let component: BillrptdatewiseComponent;
  let fixture: ComponentFixture<BillrptdatewiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillrptdatewiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillrptdatewiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
