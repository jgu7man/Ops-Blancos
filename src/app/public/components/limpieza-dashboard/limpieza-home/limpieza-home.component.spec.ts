import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimpiezaHomeComponent } from './limpieza-home.component';

describe('LimpiezaHomeComponent', () => {
  let component: LimpiezaHomeComponent;
  let fixture: ComponentFixture<LimpiezaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimpiezaHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimpiezaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
