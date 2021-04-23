import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavanderiaPackingComponent } from './lavanderia-packing.component';

describe('LavanderiaPackingComponent', () => {
  let component: LavanderiaPackingComponent;
  let fixture: ComponentFixture<LavanderiaPackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LavanderiaPackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LavanderiaPackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
