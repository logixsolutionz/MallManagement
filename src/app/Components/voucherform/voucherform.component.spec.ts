import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherformComponent } from './voucherform.component';

describe('VoucherformComponent', () => {
  let component: VoucherformComponent;
  let fixture: ComponentFixture<VoucherformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
