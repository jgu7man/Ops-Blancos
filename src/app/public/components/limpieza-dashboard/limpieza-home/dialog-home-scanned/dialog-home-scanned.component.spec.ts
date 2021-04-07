import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHomeScannedComponent } from './dialog-home-scanned.component';

describe('DialogHomeScannedComponent', () => {
  let component: DialogHomeScannedComponent;
  let fixture: ComponentFixture<DialogHomeScannedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogHomeScannedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHomeScannedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
