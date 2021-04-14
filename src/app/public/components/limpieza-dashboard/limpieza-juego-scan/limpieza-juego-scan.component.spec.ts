import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimpiezaJuegoScanComponent } from './limpieza-juego-scan.component';

describe('LimpiezaJuegoScanComponent', () => {
  let component: LimpiezaJuegoScanComponent;
  let fixture: ComponentFixture<LimpiezaJuegoScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimpiezaJuegoScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimpiezaJuegoScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
