import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavanderiaReportComponent } from './lavanderia-report.component';

describe('LavanderiaReportComponent', () => {
  let component: LavanderiaReportComponent;
  let fixture: ComponentFixture<LavanderiaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LavanderiaReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LavanderiaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
