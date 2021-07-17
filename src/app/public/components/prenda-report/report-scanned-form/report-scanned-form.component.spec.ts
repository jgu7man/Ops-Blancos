import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportScannedFormComponent } from './report-scanned-form.component';

describe('LimpiezaScannedFormComponent', () => {
  let component: ReportScannedFormComponent;
  let fixture: ComponentFixture<ReportScannedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportScannedFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportScannedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
