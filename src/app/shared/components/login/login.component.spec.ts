import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, LoginComponent, FormsModule, TranslatePipe],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind username and password to the model', () => {
    fixture.detectChanges();

    const usernameInput = fixture.debugElement.query(By.css('#username')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;

    usernameInput.value = 'admin';
    usernameInput.dispatchEvent(new Event('input'));

    passwordInput.value = 'password';
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.username).toBe('admin');
    expect(component.password).toBe('password');
  });

  it('should log in successfully with correct credentials', () => {
    spyOn(localStorage, 'setItem');

    component.username = 'admin';
    component.password = 'password';
    component.login();

    expect(localStorage.setItem).toHaveBeenCalledWith('authToken', 'mysecrettoken');
    expect(mockAuthService.login).toHaveBeenCalledWith('mysecrettoken');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(component.errorMessage).toBe('');
  });

  it('should show an error message with incorrect credentials', () => {
    component.username = 'wrong';
    component.password = 'incorrect';
    component.login();

    expect(component.errorMessage).toBe('Invalid username or password');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(mockAuthService.login).not.toHaveBeenCalled();
  });

  it('should display error message when errorMessage is set', () => {
    component.errorMessage = 'Invalid username or password';
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.text-danger')).nativeElement;
    expect(errorElement.textContent).toContain('Invalid username or password');
  });
});
