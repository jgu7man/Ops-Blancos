import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddJuegoComponent } from './dialog-add-juego.component';

describe('DialogAddJuegoComponent', () => {
  let component: DialogAddJuegoComponent;
  let fixture: ComponentFixture<DialogAddJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddJuegoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
