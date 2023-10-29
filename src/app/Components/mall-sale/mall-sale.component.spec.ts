import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MallSaleComponent } from './mall-sale.component';

describe('MallSaleComponent', () => {
  let component: MallSaleComponent;
  let fixture: ComponentFixture<MallSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MallSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MallSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
