import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionNotifierComponent } from './version-notifier.component';

describe('VersionNotifierComponent', () => {
  let component: VersionNotifierComponent;
  let fixture: ComponentFixture<VersionNotifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionNotifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
