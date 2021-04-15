import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseGlobeComponent } from './house-globe.component';

describe('HouseGlobeComponent', () => {
  let component: HouseGlobeComponent;
  let fixture: ComponentFixture<HouseGlobeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseGlobeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseGlobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
