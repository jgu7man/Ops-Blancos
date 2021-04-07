import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePropiedadesComponent } from './manage-propiedades.component';

describe('ManagePropiedadesComponent', () => {
  let component: ManagePropiedadesComponent;
  let fixture: ComponentFixture<ManagePropiedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePropiedadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
