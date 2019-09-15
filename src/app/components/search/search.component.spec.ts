import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { SavagaiLexiconService } from './../../services/savagai-lexicon.service';
import { SimilarWord, LexiconWordInfo } from './../../models/lexicon-models';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgbModule
      ],
      declarations: [
        SearchComponent
      ],
      providers: [
        SavagaiLexiconService,
        NgbModal
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a doSearch() function', () => {
    expect(component.doSearch).toBeDefined();
  });

  it('doSearch() should set loading var to true if a second argument is provided', () => {
    component.doSearch('en', 'word');

    expect(component.loading).toBeTruthy();
  });

  it('doSearch() should not set loading var to true if a second argument is provided', () => {
    component.doSearch('en', '');

    expect(component.loading).toBeFalsy();
  });

  it('doSearch() should set the similarWords variable to the similar words of search word', (inject([SavagaiLexiconService], s => {
    const savagaiService = s;
    const similarWords: SimilarWord[] = [ { word: 'similarWords', strength: 0.222 }];
    spyOn(savagaiService, 'getSimilarLexiconWords').and.returnValue(of(similarWords));

    component.doSearch('en', 'word');

    expect(component.similarWords).toEqual(similarWords);
  })));

  it('doSearch() should not set the similarWords variable to the similar words of search word on error',
      (inject([SavagaiLexiconService], s => {
        const savagaiService = s;
        const similarWords: SimilarWord[] = [ { word: 'similarWords', strength: 0.222 }];
        spyOn(savagaiService, 'getSimilarLexiconWords').and.returnValue(throwError('error'));

        component.doSearch('en', 'word');

        expect(component.similarWords).not.toEqual(similarWords);
      }))
  );

  it('should have a openWordInfoModal() function', () => {
    expect(component.openWordInfoModal).toBeDefined();
  });

  it('openWordInfoModal() should set wordInfo variable to the information of the word we are sending to api endpoint',
      (inject([SavagaiLexiconService], s => {
        const savagaiService = s;
        const wordInfo: LexiconWordInfo = {
          word: 'similarWords',
          frequency: 223,
          documentFrequency: 23,
          relativeRank: 2,
          absoluteRank: 23,
          vocabularySize: 100
        };
        spyOn(savagaiService, 'getLexiconWordInfo').and.returnValue(of(wordInfo));

        component.openWordInfoModal('content', 'en', 'word');

        expect(component.wordInfo).toEqual(wordInfo);
      }))
  );

  it('openWordInfoModal() should not set wordInfo variable to the information of the word we are sending to api endpoint',
      (inject([SavagaiLexiconService], s => {
        const savagaiService = s;
        const wordInfo: LexiconWordInfo = {
          word: 'similarWords',
          frequency: 223,
          documentFrequency: 23,
          relativeRank: 2,
          absoluteRank: 23,
          vocabularySize: 100
        };
        spyOn(savagaiService, 'getLexiconWordInfo').and.returnValue(throwError('error'));

        component.openWordInfoModal('content', 'en', 'word');

        expect(component.wordInfo).not.toEqual(wordInfo);
      }))
  );

  it('should have a closeWordInfoModal() function', () => {
    expect(component.closeWordInfoModal).toBeDefined();
  });

  it('closeWordInfoModal() should call modalRef close on the modal reference passed', inject([NgbModal], s => {
    const modalService = s;
    const modalRef: NgbModalRef = modalService.open('');
    spyOn(modalRef, 'close');

    component.openWordInfoModal('', 'en', 'word');
    component.closeWordInfoModal(modalRef);

    expect(modalRef.close).toHaveBeenCalled();
  }));
});
