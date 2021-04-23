import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavanderiaJuegoScanComponent } from './lavanderia-juego-scan.component';

describe('LavanderiaJuegoScanComponent', () => {
  let component: LavanderiaJuegoScanComponent;
  let fixture: ComponentFixture<LavanderiaJuegoScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LavanderiaJuegoScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LavanderiaJuegoScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
