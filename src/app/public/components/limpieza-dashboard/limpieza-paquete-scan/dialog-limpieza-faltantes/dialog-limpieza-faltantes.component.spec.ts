import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLimpiezaFaltantesComponent } from './dialog-limpieza-faltantes.component';

describe('DialogLimpiezaFaltantesComponent', () => {
  let component: DialogLimpiezaFaltantesComponent;
  let fixture: ComponentFixture<DialogLimpiezaFaltantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLimpiezaFaltantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLimpiezaFaltantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
