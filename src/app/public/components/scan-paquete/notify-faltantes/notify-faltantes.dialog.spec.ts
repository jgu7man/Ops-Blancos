import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyFaltantesDialog } from './notify-faltantes.dialog';

describe('NotifyFaltantesDialog', () => {
  let component: NotifyFaltantesDialog;
  let fixture: ComponentFixture<NotifyFaltantesDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifyFaltantesDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyFaltantesDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
