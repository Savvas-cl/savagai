import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SavagaiLexiconService } from './savagai-lexicon.service';

describe('SavagaiLexiconService', () => {
  beforeEach(() => TestBed.configureTestingModule({
  imports: [
    HttpClientTestingModule
  ]
}));

  it('should be created', () => {
    const service: SavagaiLexiconService = TestBed.get(SavagaiLexiconService);
    expect(service).toBeTruthy();
  });
});
