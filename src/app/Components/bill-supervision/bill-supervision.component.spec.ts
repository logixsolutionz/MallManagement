import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillSupervisionComponent } from './bill-supervision.component';

describe('BillSupervisionComponent', () => {
  let component: BillSupervisionComponent;
  let fixture: ComponentFixture<BillSupervisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillSupervisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
