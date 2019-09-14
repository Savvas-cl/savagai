import { TestBed } from '@angular/core/testing';

import { SavagaiLexiconService } from './savagai-lexicon.service';

describe('SavagaiLexiconService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SavagaiLexiconService = TestBed.get(SavagaiLexiconService);
    expect(service).toBeTruthy();
  });
});
