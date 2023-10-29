import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDetailOwnerWiseComponent } from './shop-detail-owner-wise.component';

describe('ShopDetailOwnerWiseComponent', () => {
  let component: ShopDetailOwnerWiseComponent;
  let fixture: ComponentFixture<ShopDetailOwnerWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopDetailOwnerWiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopDetailOwnerWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
