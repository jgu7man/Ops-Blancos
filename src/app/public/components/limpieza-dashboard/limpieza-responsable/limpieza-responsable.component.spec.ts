import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimpiezaResponsableComponent } from './limpieza-responsable.component';

describe('LimpiezaResponsableComponent', () => {
  let component: LimpiezaResponsableComponent;
  let fixture: ComponentFixture<LimpiezaResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimpiezaResponsableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimpiezaResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
