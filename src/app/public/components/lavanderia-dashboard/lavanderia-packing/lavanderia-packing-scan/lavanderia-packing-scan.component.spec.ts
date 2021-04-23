import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavanderiaPackingScanComponent } from './lavanderia-packing-scan.component';

describe('LavanderiaPackingScanComponent', () => {
  let component: LavanderiaPackingScanComponent;
  let fixture: ComponentFixture<LavanderiaPackingScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LavanderiaPackingScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LavanderiaPackingScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
