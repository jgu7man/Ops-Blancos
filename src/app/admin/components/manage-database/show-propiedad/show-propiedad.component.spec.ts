import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPropiedadComponent } from './show-propiedad.component';

describe('ShowPropiedadComponent', () => {
  let component: ShowPropiedadComponent;
  let fixture: ComponentFixture<ShowPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPropiedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
