import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavanderiaDashboardComponent } from './lavanderia-dashboard.component';

describe('LavanderiaDashboardComponent', () => {
  let component: LavanderiaDashboardComponent;
  let fixture: ComponentFixture<LavanderiaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LavanderiaDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LavanderiaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
