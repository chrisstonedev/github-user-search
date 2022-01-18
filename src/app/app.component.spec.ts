import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {GetUserResult, UserSearchService} from './user-search.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {UserComponent} from './user/user.component';

// noinspection SpellCheckingInspection
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: UserSearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [AppComponent, UserComponent],
      providers: [UserSearchService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.resultsPerPage = 10;
    service = TestBed.inject(UserSearchService);
    spyOn(service, 'getUsers').and.callFake((searchText, resultsPerPage, requestedPage) => {
      return of({
        total_count: 26,
        items: ALPHABET
          .split('')
          .map(x => ({url: x, html_url: '', avatar_url: '', login: x}))
          .slice(resultsPerPage * (requestedPage - 1), resultsPerPage * requestedPage)
      });
    });
    spyOn(service, 'getUser').and.callFake((apiUrl) => {
      return of<GetUserResult>({
        avatar_url: '',
        bio: '',
        blog: '',
        company: '',
        followers: 0,
        following: 0,
        html_url: '',
        location: '',
        login: apiUrl,
        name: '',
        public_repos: 0,
      });
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toEqual('GitHub User Search');
  });

  it('should render input label', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('label')?.textContent).toEqual('Search for a GitHub user:');
    let inputId = compiled.querySelector('input')?.id;
    expect(compiled.querySelector('label')?.htmlFor).toEqual(inputId);
  });

  function getByCss(cssSelector: string): DebugElement {
    return fixture.debugElement.query(By.css(cssSelector));
  }

  function innerHtmlOf(cssSelector: string): string {
    return getByCss(cssSelector).nativeElement.innerHTML;
  }

  function confirmPageTwoOfAbc() {
    expect(innerHtmlOf('span')).toContain('Page 2');
    expect(fixture.debugElement.queryAll(By.css('.user-result')).length).toEqual(10);
    expect(innerHtmlOf('.user-result:nth-of-type(1) h2')).toContain('k');
    expect(getByCss('button#previous')).toBeTruthy();
    expect(getByCss('button#next')).toBeTruthy();
  }

  it('should paginate 26 results into 3 pages', () => {
    component.inputText = ALPHABET;
    component.searchForUsers();
    fixture.detectChanges();

    expect(innerHtmlOf('p')).toContain('Found 26 results:');
    expect(innerHtmlOf('span')).toContain('Page 1');
    expect(fixture.debugElement.queryAll(By.css('.user-result')).length).toEqual(10);
    expect(innerHtmlOf('.user-result:nth-of-type(1) h2')).toContain('a');
    expect(getByCss('button#previous')).toBeNull();
    expect(getByCss('button#next')).toBeTruthy();
    component.getNextResults();
    fixture.detectChanges();

    confirmPageTwoOfAbc();
    component.getNextResults();
    fixture.detectChanges();

    expect(innerHtmlOf('span')).toContain('Page 3');
    expect(fixture.debugElement.queryAll(By.css('.user-result')).length).toEqual(6);
    expect(innerHtmlOf('.user-result:nth-of-type(1) h2')).toContain('u');
    expect(getByCss('button#previous')).toBeTruthy();
    expect(getByCss('button#next')).toBeNull()
  });

  it('should not alter results if search text is changed', () => {
    component.inputText = ALPHABET;
    component.searchForUsers();
    fixture.detectChanges();

    let span = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(span.innerHTML).toContain('Page 1');
    component.getNextResults();
    fixture.detectChanges();

    confirmPageTwoOfAbc();
    component.getNextResults();
    fixture.detectChanges();

    span = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(span.innerHTML).toContain('Page 3');
    component.inputText = 'hello';
    component.getPreviousResults();
    fixture.detectChanges();

    confirmPageTwoOfAbc();
    expect(component.inputText).toEqual(ALPHABET);
  });
});
