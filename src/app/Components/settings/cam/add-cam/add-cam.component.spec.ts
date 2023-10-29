import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCAMComponent } from './add-cam.component';

describe('AddCAMComponent', () => {
  let component: AddCAMComponent;
  let fixture: ComponentFixture<AddCAMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCAMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCAMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
