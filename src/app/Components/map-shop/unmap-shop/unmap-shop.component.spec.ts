import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnmapShopComponent } from './unmap-shop.component';

describe('UnmapShopComponent', () => {
  let component: UnmapShopComponent;
  let fixture: ComponentFixture<UnmapShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnmapShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnmapShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
