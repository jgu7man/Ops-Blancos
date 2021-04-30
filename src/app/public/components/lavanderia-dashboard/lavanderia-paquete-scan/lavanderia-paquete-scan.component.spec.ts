import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavanderiaPaqueteScanComponent } from './lavanderia-paquete-scan.component';

describe('LavanderiaPaqueteScanComponent', () => {
  let component: LavanderiaPaqueteScanComponent;
  let fixture: ComponentFixture<LavanderiaPaqueteScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LavanderiaPaqueteScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LavanderiaPaqueteScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
