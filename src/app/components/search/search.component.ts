import { Component, OnInit, OnDestroy } from '@angular/core';
import { SavagaiLexiconService } from '../../services/savagai-lexicon.service';
import { Observable, Subscription } from 'rxjs';

import { SimilarWord } from '../../models/lexicon-word-info';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public availableLanguages: Observable<string[]>;
  public selectedLanguage = 'EN';
  public similarWords: SimilarWord[];
  public similarWordsSub: Subscription;
  public loading = false;

  constructor(private savagaiApi: SavagaiLexiconService) {

  }

  ngOnInit() {
    this.availableLanguages = this.savagaiApi.getGavagaiSupportedLanguages();
  }

  doSearch(language: string, wordToSearch: string) {
    this.loading = true;
    this.similarWordsSub = this.savagaiApi.getLexiconWordInfo(language, wordToSearch.replace(/\s/g, ''))
      .subscribe(
        resultWords => {
          this.similarWords = resultWords;
          this.loading = false;
        },
        error => {
          console.error(error);
        }
      );
  }

  ngOnDestroy() {

  }
}
