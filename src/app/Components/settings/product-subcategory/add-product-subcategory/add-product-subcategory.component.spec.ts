import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductSubcategoryComponent } from './add-product-subcategory.component';

describe('AddProductSubcategoryComponent', () => {
  let component: AddProductSubcategoryComponent;
  let fixture: ComponentFixture<AddProductSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductSubcategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
