import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  public isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }

  public getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  public authenticate(userId: string): Observable<{ userId: string, token: string}> {
    return this.httpClient.post(`${environment.baseUrl}/login`, { userId }) as Observable<{ userId: string, token: string}>;
  }

  public logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
