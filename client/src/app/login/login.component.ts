// login.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/representation/loginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emptyError: Boolean = false;
  token: string = '';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  onPasswordChange() {
    this.emptyError = false;
  }

  storeTokenInCookie(token: string) {
    // Set the cookie with a name 'userToken' and the provided token
    this.cookieService.set('userToken', token);
  }

  getTokenFromCookie() {
    // Get the value of the 'userToken' cookie
    const token = this.cookieService.get('userToken');
    return token;
  }

  postData() {
    const url = 'http://localhost:5000/api/v1/users/login';
    const data = {
      email: this.email,
      password: this.password,
    };

    if (!this.email || !this.password) {
      this.emptyError = true;
    } else {
      this.http.post<LoginResponse>(url, data).subscribe(
        (response) => {
          console.log('POST request successful', response);
          this.token = response.data.token;
          this.storeTokenInCookie(this.token);
          if (this.getTokenFromCookie()) {
            this.router.navigate(['home']);
          }
        },
        (error) => {
          console.error('Error in POST request', error);
          // Handle the error here
        }
      );
    }
  }

  onSubmit() {
    console.log(this.email, this.password);
    this.postData();
  }
}
