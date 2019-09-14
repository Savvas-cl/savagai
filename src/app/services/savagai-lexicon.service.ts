import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, empty, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SimilarWord } from '../models/lexicon-word-info';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SavagaiLexiconService {
  private baseApiUrl = environment.savagaiAPI;
  private apiKey = environment.testUserAPIKey;

  constructor(private http: HttpClient) {

  }

  getGavagaiSupportedLanguages(): Observable<string[]> {
    const requestUrl = `${this.baseApiUrl}/languages?apiKey=${this.apiKey}`;

    return this.http.get<any>(requestUrl);
  }

  getLexiconWordInfo(language: string, word: string): Observable<SimilarWord[]> {
    const requestUrl = `${this.baseApiUrl}/lexicon/${language}/${word}?apiKey=${this.apiKey}&additionalFields=SEMANTICALLY_SIMILAR_WORDS`;

    console.log(requestUrl);
   /* return this.http.get<any>(requestUrl)
      .pipe(
        map(results => {
          console.log(results);
          return new LexiconWordInfo(
            results.word,
            results.frequency,
            results.documentFrequency,
            results.absoluteRank,
            results.relativeRank,
            results.vocabularySize,
            results.semanticallySimilarWords
          );
        })
      ); */

    return this.http.get<any>(requestUrl)
    .pipe(
      map(results => {
        return results.semanticallySimilarWords.map(simWord => {
          return new SimilarWord(
            simWord.word,
            simWord.strength
          );
        });
      })
    );
  }
}
