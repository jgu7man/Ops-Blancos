import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPaqueteComponent } from './show-paquete.component';

describe('ShowPaqueteComponent', () => {
  let component: ShowPaqueteComponent;
  let fixture: ComponentFixture<ShowPaqueteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPaqueteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
