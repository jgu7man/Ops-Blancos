import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimpiezaScannedFormDialog } from './limpieza-scanned-form.component';

describe('LimpiezaScannedFormComponent', () => {
  let component: LimpiezaScannedFormDialog;
  let fixture: ComponentFixture<LimpiezaScannedFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimpiezaScannedFormDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimpiezaScannedFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
