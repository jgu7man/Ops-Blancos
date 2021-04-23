import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavanderiaFormReporteComponent } from './lavanderia-form-reporte.component';

describe('LavanderiaFormReporteComponent', () => {
  let component: LavanderiaFormReporteComponent;
  let fixture: ComponentFixture<LavanderiaFormReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LavanderiaFormReporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LavanderiaFormReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
