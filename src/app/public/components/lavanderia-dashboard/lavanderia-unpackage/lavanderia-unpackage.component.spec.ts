import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavanderiaUnpackageComponent } from './lavanderia-unpackage.component';

describe('LavanderiaUnpackageComponent', () => {
  let component: LavanderiaUnpackageComponent;
  let fixture: ComponentFixture<LavanderiaUnpackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LavanderiaUnpackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LavanderiaUnpackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
