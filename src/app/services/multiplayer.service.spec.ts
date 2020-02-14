import { TestBed } from '@angular/core/testing';

import { MultiplayerService } from './multiplayer.service';

describe('MultiplayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MultiplayerService = TestBed.get(MultiplayerService);
    expect(service).toBeTruthy();
  });
});
