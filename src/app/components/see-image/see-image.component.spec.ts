import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeImageComponent } from './see-image.component';

describe('SeeImageComponent', () => {
  let component: SeeImageComponent;
  let fixture: ComponentFixture<SeeImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
