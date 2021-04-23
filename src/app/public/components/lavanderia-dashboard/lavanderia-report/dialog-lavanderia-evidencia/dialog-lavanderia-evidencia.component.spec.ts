import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLavanderiaEvidenciaComponent } from './dialog-lavanderia-evidencia.component';

describe('DialogLavanderiaEvidenciaComponent', () => {
  let component: DialogLavanderiaEvidenciaComponent;
  let fixture: ComponentFixture<DialogLavanderiaEvidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLavanderiaEvidenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLavanderiaEvidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
