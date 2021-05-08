import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePwdComponent } from './restore-pwd.component';

describe('RestorePwdComponent', () => {
  let component: RestorePwdComponent;
  let fixture: ComponentFixture<RestorePwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestorePwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
