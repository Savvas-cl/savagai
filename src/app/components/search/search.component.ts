import { Component, OnInit } from '@angular/core';
import { SavagaiLexiconService } from '../../services/savagai-lexicon.service';
import { Observable } from 'rxjs';

import { LexiconWordInfo } from '../../models/lexicon-word-info';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public availableLanguages: Observable<string[]>;
  public selectedLanguage = 'EN';
  public similarWords: Observable<LexiconWordInfo>;

  constructor(private savagaiApi: SavagaiLexiconService) {

  }

  ngOnInit() {
    this.availableLanguages = this.savagaiApi.getGavagaiSupportedLanguages();
  }

  doSearch(language: string, wordToSearch: string) {
    this.similarWords = this.savagaiApi.getLexiconWordInfo(language, wordToSearch);
  }
}
