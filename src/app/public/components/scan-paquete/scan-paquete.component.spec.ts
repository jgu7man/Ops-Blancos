import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanPaqueteComponent } from './scan-paquete.component';

describe('ScanPaqueteComponent', () => {
  let component: ScanPaqueteComponent;
  let fixture: ComponentFixture<ScanPaqueteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanPaqueteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
