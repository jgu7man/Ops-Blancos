import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimpiezaDashboardComponent } from './limpieza-dashboard.component';

describe('LimpiezaDashboardComponent', () => {
  let component: LimpiezaDashboardComponent;
  let fixture: ComponentFixture<LimpiezaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimpiezaDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimpiezaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
