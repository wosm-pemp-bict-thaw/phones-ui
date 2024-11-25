import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:  [CommonModule, FormsModule],
  standalone: true,
})
export class LoginComponent {
  username = 'admin';
  password = 'password';
  errorMessage = '';

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  login(): void {
    // FIXME locals for msgs
    if (this.username === 'admin' && this.password === 'password') {
      localStorage.setItem('authToken', 'mockToken');
      this.auth.login('mockToken'); // FIXME token
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
