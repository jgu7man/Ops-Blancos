import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimpiezaReportComponent } from './limpieza-report.component';

describe('LimpiezaReportComponent', () => {
  let component: LimpiezaReportComponent;
  let fixture: ComponentFixture<LimpiezaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimpiezaReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimpiezaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
