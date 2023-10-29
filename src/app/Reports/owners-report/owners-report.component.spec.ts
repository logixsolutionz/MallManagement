import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersReportComponent } from './owners-report.component';

describe('OwnersReportComponent', () => {
  let component: OwnersReportComponent;
  let fixture: ComponentFixture<OwnersReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnersReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
