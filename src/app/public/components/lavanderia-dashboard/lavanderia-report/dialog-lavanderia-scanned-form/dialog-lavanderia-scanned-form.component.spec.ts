import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLavanderiaScannedFormComponent } from './dialog-lavanderia-scanned-form.component';

describe('DialogLavanderiaScannedFormComponent', () => {
  let component: DialogLavanderiaScannedFormComponent;
  let fixture: ComponentFixture<DialogLavanderiaScannedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLavanderiaScannedFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLavanderiaScannedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
