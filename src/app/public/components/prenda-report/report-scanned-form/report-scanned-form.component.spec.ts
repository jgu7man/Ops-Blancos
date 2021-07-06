import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportScannedFormDialog } from './report-scanned-form.component';

describe('LimpiezaScannedFormComponent', () => {
  let component: ReportScannedFormDialog;
  let fixture: ComponentFixture<ReportScannedFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportScannedFormDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportScannedFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
