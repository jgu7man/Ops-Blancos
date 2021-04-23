import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUnpackageScannedComponent } from './dialog-unpackage-scanned.component';

describe('DialogUnpackageScannedComponent', () => {
  let component: DialogUnpackageScannedComponent;
  let fixture: ComponentFixture<DialogUnpackageScannedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUnpackageScannedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUnpackageScannedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
