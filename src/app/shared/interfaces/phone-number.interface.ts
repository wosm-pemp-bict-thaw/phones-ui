export interface PhoneNumber {
  id: number;
  number: string;
  status: 'active' | 'inactive';
  messages: number;
}
