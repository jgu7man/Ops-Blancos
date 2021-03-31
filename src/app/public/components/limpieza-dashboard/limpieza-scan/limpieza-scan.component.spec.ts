import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimpiezaScanComponent } from './limpieza-scan.component';

describe('LimpiezaScanComponent', () => {
  let component: LimpiezaScanComponent;
  let fixture: ComponentFixture<LimpiezaScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimpiezaScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimpiezaScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
