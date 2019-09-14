import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { SavagaiLexiconService } from '../../services/savagai-lexicon.service';
import { Observable, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LexiconWordInfo, SimilarWord } from '../../models/lexicon-word-info';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public availableLanguages: Observable<string[]>;
  public selectedLanguage = 'EN';
  public similarWords: SimilarWord[];
  public similarWordsSub: Subscription;
  public wordInfo: LexiconWordInfo;
  public wordInfoSub: Subscription;
  public modalError: string;
  public loading = false;

  constructor(private savagaiApi: SavagaiLexiconService, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.availableLanguages = this.savagaiApi.getGavagaiSupportedLanguages();
  }

  doSearch(language: string, wordToSearch: string) {
    if (wordToSearch) {
      this.loading = true;
      this.similarWordsSub = this.savagaiApi.getSimilarLexiconWords(language, wordToSearch.replace(/\s/g, ''))
        .subscribe(
          resultWords => {
            this.similarWords = resultWords;
            this.loading = false;
          },
          error => {
            console.error(error);
          }
        );
    } else {
      this.similarWords = [];
    }
  }

  openWordInfoModal(content, language, word) {
    this.wordInfoSub = this.savagaiApi.getLexiconWordInfo(language, word)
      .subscribe(
        infoOfWord => {
          this.wordInfo = infoOfWord;
        },
        error => {
          this.modalError = `Error: ${error.message}`;
          console.error(error);
        }
      );
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  closeWordInfoModal(modalRef) {
    this.modalError = undefined;
    this.wordInfo = undefined;
    modalRef.close();
    this.wordInfoSub.unsubscribe();
  }

  ngOnDestroy() {
    this.similarWordsSub.unsubscribe();
  }
}
