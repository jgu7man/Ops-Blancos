import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadSearchComponent } from './propiedad-search.component';

describe('PropiedadSearchComponent', () => {
  let component: PropiedadSearchComponent;
  let fixture: ComponentFixture<PropiedadSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropiedadSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiedadSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
