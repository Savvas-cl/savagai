import { Component, ViewEncapsulation, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { SavagaiLexiconService } from '../../services/savagai-lexicon.service';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { LexiconWordInfo, SimilarWord } from '../../models/lexicon-models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('search', { static: false }) searchInput: ElementRef;

  public availableLanguages: Observable<string[]>;
  public selectedLanguage = 'EN';
  public searchTerm: string;
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
    this.searchTerm = wordToSearch;
    this.searchInput.nativeElement.value = '';

    if (wordToSearch) {
      this.loading = true;
      this.similarWordsSub = this.savagaiApi.getSimilarLexiconWords(language, this.searchTerm)
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

  openWordInfoModal(content: any, language: string, word: string) {
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

    const openModal: NgbModalRef = this.modalService.open(content, { windowClass: 'dark-modal' });
    openModal.result.then(() => {
      this.modalError = undefined;
      this.wordInfo = undefined;
    }, () => {
      this.modalError = undefined;
      this.wordInfo = undefined;
    });
  }

  closeWordInfoModal(modalRef: NgbModalRef) {
    modalRef.close();
    this.wordInfoSub.unsubscribe();
  }

  ngOnDestroy() {
    this.similarWordsSub.unsubscribe();
  }
}
