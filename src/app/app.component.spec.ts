import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";

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
