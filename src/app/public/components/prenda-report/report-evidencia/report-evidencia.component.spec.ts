import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEvidenciaDialog } from './report-evidencia.component';

describe('LimpiezaEvidenciaDialogComponent', () => {
  let component: ReportEvidenciaDialog;
  let fixture: ComponentFixture<ReportEvidenciaDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportEvidenciaDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEvidenciaDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
