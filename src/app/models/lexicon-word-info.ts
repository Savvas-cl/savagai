export class SimilarWord {

  constructor(public word: string,
              public strength: number) {}
}

export class LexiconWordInfo {

  constructor(public word: string,
              public frequency: number,
              public documentFrequency: number,
              public absoluteRank: number,
              public relativeRank: number,
              public vocabularySize: number,
              public semanticallySimilarWords: SimilarWord[]) {}
}
