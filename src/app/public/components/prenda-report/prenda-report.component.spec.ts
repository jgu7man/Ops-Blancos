import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrendaReportComponent } from './prenda-report.component';

describe('LimpiezaReportComponent', () => {
  let component: PrendaReportComponent;
  let fixture: ComponentFixture<PrendaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrendaReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrendaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
