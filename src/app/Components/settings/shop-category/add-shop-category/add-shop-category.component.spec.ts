import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopCategoryComponent } from './add-shop-category.component';

describe('AddShopCategoryComponent', () => {
  let component: AddShopCategoryComponent;
  let fixture: ComponentFixture<AddShopCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShopCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShopCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
