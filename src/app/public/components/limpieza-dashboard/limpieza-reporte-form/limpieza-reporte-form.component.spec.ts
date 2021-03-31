import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimpiezaReporteFormComponent } from './limpieza-reporte-form.component';

describe('LimpiezaReporteFormComponent', () => {
  let component: LimpiezaReporteFormComponent;
  let fixture: ComponentFixture<LimpiezaReporteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimpiezaReporteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimpiezaReporteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
