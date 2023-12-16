import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('userId');
  }

  public authenticate(userId: string): void {
    localStorage.setItem('userId', userId);
  }
}
