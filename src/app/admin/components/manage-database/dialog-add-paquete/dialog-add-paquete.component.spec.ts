import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPaqueteComponent } from './dialog-add-paquete.component';

describe('DialogAddPaqueteComponent', () => {
  let component: DialogAddPaqueteComponent;
  let fixture: ComponentFixture<DialogAddPaqueteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddPaqueteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
