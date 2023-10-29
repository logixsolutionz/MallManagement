import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CAMComponent } from './cam.component';

describe('CAMComponent', () => {
  let component: CAMComponent;
  let fixture: ComponentFixture<CAMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CAMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CAMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
