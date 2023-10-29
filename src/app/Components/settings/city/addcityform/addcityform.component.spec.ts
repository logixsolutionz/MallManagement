import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcityformComponent } from './addcityform.component';

describe('AddcityformComponent', () => {
  let component: AddcityformComponent;
  let fixture: ComponentFixture<AddcityformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcityformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcityformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
