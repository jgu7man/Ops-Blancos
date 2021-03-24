import { TestBed } from '@angular/core/testing';

import { ListenLoggedGuard } from './listen-logged.guard';

describe('ListenLoggedGuard', () => {
  let guard: ListenLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ListenLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
