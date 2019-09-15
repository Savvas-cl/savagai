import { SimilarWord, LexiconWordInfo } from './lexicon-models';

describe('Lexicon models', () => {
  it('should create a new SimilarWord instance', () => {
    expect(new SimilarWord('word', 0.23434)).toBeTruthy();
  });
  it('should create a new LexiconWordInfo instance', () => {
    expect(new LexiconWordInfo('word', 11123, 7665, 7653, 0.23434, 23000)).toBeTruthy();
  });
});
