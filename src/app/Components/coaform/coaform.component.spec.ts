import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoaformComponent } from './coaform.component';

describe('CoaformComponent', () => {
  let component: CoaformComponent;
  let fixture: ComponentFixture<CoaformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoaformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
