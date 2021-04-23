import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingFaltantesDialog } from './dialog-packing-faltantes.component';

describe('DialogLavanderiaFaltantesComponent', () => {
  let component: PackingFaltantesDialog;
  let fixture: ComponentFixture<PackingFaltantesDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackingFaltantesDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingFaltantesDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
