import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlstatComponent } from './plstat.component';

describe('PlstatComponent', () => {
  let component: PlstatComponent;
  let fixture: ComponentFixture<PlstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlstatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
