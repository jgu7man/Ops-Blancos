import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialItemComponent } from './historial-item.component';

describe('HistorialItemComponent', () => {
  let component: HistorialItemComponent;
  let fixture: ComponentFixture<HistorialItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
