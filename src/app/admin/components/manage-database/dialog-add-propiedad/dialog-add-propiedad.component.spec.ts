import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPropiedadComponent } from './dialog-add-propiedad.component';

describe('DialogAddPropiedadComponent', () => {
  let component: DialogAddPropiedadComponent;
  let fixture: ComponentFixture<DialogAddPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddPropiedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
