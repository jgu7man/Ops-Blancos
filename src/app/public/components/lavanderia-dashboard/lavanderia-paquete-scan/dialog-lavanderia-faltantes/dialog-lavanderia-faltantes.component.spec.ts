import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLavanderiaFaltantesComponent } from './dialog-lavanderia-faltantes.component';

describe('DialogLavanderiaFaltantesComponent', () => {
  let component: DialogLavanderiaFaltantesComponent;
  let fixture: ComponentFixture<DialogLavanderiaFaltantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLavanderiaFaltantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLavanderiaFaltantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
