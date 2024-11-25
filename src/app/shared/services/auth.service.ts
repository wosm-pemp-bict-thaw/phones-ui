import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSignal: WritableSignal<boolean> = signal(false);

  constructor() {
    this.checkAuthStatus();
  }

  isAuthenticated = this.isAuthenticatedSignal.asReadonly();

  private checkAuthStatus(): void {
    const token = localStorage.getItem('authToken');
    this.isAuthenticatedSignal.set(!!token);
  }
  
  login(token: string): void {
    localStorage.setItem('authToken', token);
    this.isAuthenticatedSignal.set(true);
    console.log("OK LOGGED")
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticatedSignal.set(false);
  }
}
