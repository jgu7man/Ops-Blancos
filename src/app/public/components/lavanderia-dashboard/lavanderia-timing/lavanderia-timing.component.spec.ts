import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavanderiaTimingComponent } from './lavanderia-timing.component';

describe('LavanderiaTimingComponent', () => {
  let component: LavanderiaTimingComponent;
  let fixture: ComponentFixture<LavanderiaTimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LavanderiaTimingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LavanderiaTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
