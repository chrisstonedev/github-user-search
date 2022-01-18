import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render input label', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('label')?.textContent).toEqual('Search for GitHub user');
    let inputId = compiled.querySelector('input')?.id;
    expect(compiled.querySelector('label')?.htmlFor).toEqual(inputId);
  });
});


describe('AppComponent moving from Cypress', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  function setInputValue(selector: string, value: string) {
    fixture.detectChanges();
    tick();

    let input = fixture.debugElement.query(By.css(selector)).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    tick();
  }

  function confirmPageTwoOfAbc() {
    let span = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(span.innerHTML).toContain('Page 2');
    let users = fixture.debugElement.queryAll(By.css('.user-result'));
    expect(users.length).toEqual(10);
    let firstUser = fixture.debugElement.query(By.css('.user-result:nth-of-type(1)')).nativeElement;
    expect(firstUser.innerHTML).toContain('k');
    let previousButton = fixture.debugElement.query(By.css('button#previous'));
    expect(previousButton).toBeTruthy();
    let nextButton = fixture.debugElement.query(By.css('button#next'));
    expect(nextButton).toBeTruthy();
  }

  it('should paginate 26 results into 3 pages', fakeAsync(() => {
    setInputValue('input','abcdefghijklmnopqrstuvwxyz');
    expect(component.inputText).toEqual('abcdefghijklmnopqrstuvwxyz');
    component.searchForUsers();
    fixture.detectChanges();

    let paragraph = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(paragraph.innerHTML).toContain('Found 26 results:');
    let span = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(span.innerHTML).toContain('Page 1');
    let users = fixture.debugElement.queryAll(By.css('.user-result'));
    expect(users.length).toEqual(10);
    let firstUser = fixture.debugElement.query(By.css('.user-result:nth-of-type(1)')).nativeElement;
    expect(firstUser.innerHTML).toContain('a');
    let previousButton = fixture.debugElement.query(By.css('button#previous'));
    expect(previousButton).toBeNull();
    let nextButton = fixture.debugElement.query(By.css('button#next'));
    expect(nextButton).toBeTruthy();
    component.getNextResults();
    fixture.detectChanges();

    confirmPageTwoOfAbc();
    component.getNextResults();
    fixture.detectChanges();

    span = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(span.innerHTML).toContain('Page 3');
    users = fixture.debugElement.queryAll(By.css('.user-result'));
    expect(users.length).toEqual(6);
    firstUser = fixture.debugElement.query(By.css('.user-result:nth-of-type(1)')).nativeElement;
    expect(firstUser.innerHTML).toContain('u');
    previousButton = fixture.debugElement.query(By.css('button#previous'));
    expect(previousButton).toBeTruthy();
    nextButton = fixture.debugElement.query(By.css('button#next'));
    expect(nextButton).toBeNull()
  }));

  it('should not alter results if search text is changed', fakeAsync(() => {
    setInputValue('input','abcdefghijklmnopqrstuvwxyz');
    expect(component.inputText).toEqual('abcdefghijklmnopqrstuvwxyz');
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
    setInputValue('input','hello');
    expect(component.inputText).toEqual('hello');
    component.getPreviousResults();
    fixture.detectChanges();

    confirmPageTwoOfAbc();
    expect(component.inputText).toEqual('abcdefghijklmnopqrstuvwxyz');
  }));
});
