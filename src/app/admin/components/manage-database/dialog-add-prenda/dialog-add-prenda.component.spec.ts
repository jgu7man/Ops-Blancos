import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPrendaComponent } from './dialog-add-prenda.component';

describe('DialogAddPrendaComponent', () => {
  let component: DialogAddPrendaComponent;
  let fixture: ComponentFixture<DialogAddPrendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddPrendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddPrendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
