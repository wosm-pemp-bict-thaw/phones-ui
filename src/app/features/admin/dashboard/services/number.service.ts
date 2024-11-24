import { inject, Injectable, signal, Signal } from '@angular/core';
import { PhoneNumber } from '../../../../shared/interfaces/phone-number.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class NumberService {
  private readonly httpClient = inject(HttpClient);
  private numbersSignal = signal<PhoneNumber[]>([]);
  private loadingStateSignal = signal<'idle' | 'loading' | 'error' | 'success'>('idle');

  get numbers(): Signal<PhoneNumber[]> {
    return this.numbersSignal.asReadonly();
  }

  loadNumbersFromServer(): void {
    const apiUrl = 'http://localhost:3000/api/v1/phone-info';
    const headers = new HttpHeaders({
      'Authorization': 'Bearer mysecrettoken', // TODO get from auth service, need to add interceptor
    });

    this.loadingStateSignal.set('loading');

    this.httpClient.get<PhoneNumber[]>(apiUrl, { headers }).subscribe({
      next: (numbers) => {
        this.numbersSignal.set(numbers);
        this.loadingStateSignal.set('success');
      },
      error: (error) => {
        console.error('Ошибка загрузки номеров с сервера:', error);
        this.loadingStateSignal.set('error');
      },
    });
  }

  get loadingState() {
    return this.loadingStateSignal.asReadonly();
  }

  toggleStatus(numberToToggle: PhoneNumber): void {
    this.numbersSignal.update((numbers) =>
      numbers.map((number) =>
        number.number === numberToToggle.number
          ? { ...number, status: number.status === 'active' ? 'inactive' : 'active' }
          : number
      )
    );
  }
}
