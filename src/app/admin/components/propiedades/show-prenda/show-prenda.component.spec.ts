import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPrendaComponent } from './show-prenda.component';

describe('ShowPrendaComponent', () => {
  let component: ShowPrendaComponent;
  let fixture: ComponentFixture<ShowPrendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPrendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPrendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
