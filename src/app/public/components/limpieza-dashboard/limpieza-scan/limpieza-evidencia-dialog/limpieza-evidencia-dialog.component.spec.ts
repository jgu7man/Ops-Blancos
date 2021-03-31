import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimpiezaEvidenciaDialog } from './limpieza-evidencia-dialog.component';

describe('LimpiezaEvidenciaDialogComponent', () => {
  let component: LimpiezaEvidenciaDialog;
  let fixture: ComponentFixture<LimpiezaEvidenciaDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimpiezaEvidenciaDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimpiezaEvidenciaDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
