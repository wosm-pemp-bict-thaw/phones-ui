import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSwitcherComponent } from './language-switcher.component';
import { TranslationService } from '../../services/translation.service';
import { AVAILABLE_LANGUAGES, Langs } from '../../constants/langs.enum';
import { By } from '@angular/platform-browser';

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;
  let mockTranslationService: jasmine.SpyObj<TranslationService>;

  beforeEach(async () => {
    mockTranslationService = jasmine.createSpyObj('TranslationService', ['setLanguage']);

    await TestBed.configureTestingModule({
      imports: [LanguageSwitcherComponent],
      providers: [{ provide: TranslationService, useValue: mockTranslationService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize available languages', () => {
    expect(component.availableLanguages).toEqual(AVAILABLE_LANGUAGES);
  });

  it('should toggle menu visibility when toggleLanguageMenu is called', () => {
    expect(component.isMenuOpen).toBeFalse();

    component.toggleLanguageMenu();
    expect(component.isMenuOpen).toBeTrue();

    component.toggleLanguageMenu();
    expect(component.isMenuOpen).toBeFalse();
  });

  it('should call setLanguage and close the menu when changeLanguage is called', () => {
    const testLang = Langs.en;

    component.isMenuOpen = true;
    component.changeLanguage(testLang);

    expect(mockTranslationService.setLanguage).toHaveBeenCalledWith(testLang);
    expect(component.isMenuOpen).toBeFalse();
  });

  it('should render the language menu only when isMenuOpen is true', () => {
    component.isMenuOpen = false;
    fixture.detectChanges();

    const menuElement = fixture.debugElement.query(By.css('.language-menu'));
    expect(menuElement).toBeNull();

    component.isMenuOpen = true;
    fixture.detectChanges();

    const menuElementVisible = fixture.debugElement.query(By.css('.language-menu'));
    expect(menuElementVisible).toBeTruthy();
  });

  it('should render a button for each available language', () => {
    component.isMenuOpen = true;
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('.language-menu button'));
    expect(buttons.length).toBe(AVAILABLE_LANGUAGES.length);

    buttons.forEach((button, index) => {
      expect(button.nativeElement.textContent).toContain(AVAILABLE_LANGUAGES[index].name);
    });
  });
});
