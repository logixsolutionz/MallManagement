import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsstatComponent } from './bsstat.component';

describe('BsstatComponent', () => {
  let component: BsstatComponent;
  let fixture: ComponentFixture<BsstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BsstatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BsstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
