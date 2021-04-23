import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavanderiaWorkingComponent } from './lavanderia-working.component';

describe('LavanderiaWorkingComponent', () => {
  let component: LavanderiaWorkingComponent;
  let fixture: ComponentFixture<LavanderiaWorkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LavanderiaWorkingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LavanderiaWorkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
