import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimpiezaPaqueteScanComponent } from './limpieza-paquete-scan.component';

describe('LimpiezaPaqueteScanComponent', () => {
  let component: LimpiezaPaqueteScanComponent;
  let fixture: ComponentFixture<LimpiezaPaqueteScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimpiezaPaqueteScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimpiezaPaqueteScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
