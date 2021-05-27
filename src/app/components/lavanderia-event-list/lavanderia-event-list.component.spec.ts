import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavanderiaEventListComponent } from './lavanderia-event-list.component';

describe('LavanderiaEventListComponent', () => {
  let component: LavanderiaEventListComponent;
  let fixture: ComponentFixture<LavanderiaEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LavanderiaEventListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LavanderiaEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
