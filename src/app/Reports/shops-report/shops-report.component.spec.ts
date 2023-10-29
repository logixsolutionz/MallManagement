import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsReportComponent } from './shops-report.component';

describe('ShopsReportComponent', () => {
  let component: ShopsReportComponent;
  let fixture: ComponentFixture<ShopsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
