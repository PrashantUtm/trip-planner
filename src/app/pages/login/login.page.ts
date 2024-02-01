import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public username: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public login(): void {
    if (this.username !== '') {
      this.authService.authenticate(this.username).subscribe(result => {
        sessionStorage.setItem('userId', result.user);
        sessionStorage.setItem('token', result.token);
        this.router.navigate(['/trips']);
      });
    }
  }
}
