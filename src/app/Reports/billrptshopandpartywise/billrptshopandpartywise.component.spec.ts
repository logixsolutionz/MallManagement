import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillrptshopandpartywiseComponent } from './billrptshopandpartywise.component';

describe('BillrptshopandpartywiseComponent', () => {
  let component: BillrptshopandpartywiseComponent;
  let fixture: ComponentFixture<BillrptshopandpartywiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillrptshopandpartywiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillrptshopandpartywiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
