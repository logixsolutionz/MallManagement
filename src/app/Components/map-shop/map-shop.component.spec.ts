import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapShopComponent } from './map-shop.component';

describe('MapShopComponent', () => {
  let component: MapShopComponent;
  let fixture: ComponentFixture<MapShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
