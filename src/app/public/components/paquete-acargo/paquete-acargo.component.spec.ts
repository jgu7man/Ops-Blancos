import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaqueteAcargoComponent } from './paquete-acargo.component';

describe('PaqueteAcargoComponent', () => {
  let component: PaqueteAcargoComponent;
  let fixture: ComponentFixture<PaqueteAcargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaqueteAcargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaqueteAcargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
