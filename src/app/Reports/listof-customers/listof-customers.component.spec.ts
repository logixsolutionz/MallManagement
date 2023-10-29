import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofCustomersComponent } from './listof-customers.component';

describe('ListofCustomersComponent', () => {
  let component: ListofCustomersComponent;
  let fixture: ComponentFixture<ListofCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListofCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
