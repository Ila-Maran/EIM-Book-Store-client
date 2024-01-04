import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SignUpResponse } from 'src/representation/SignUpResponse';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  userName: string = '';
  role: string = 'user';
  password: string = '';
  passwordConfirm: string = '';
  emptyError: Boolean = false;
  passwordError: Boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  onValueChange() {
    this.emptyError = false;
    this.passwordError = false;
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
    const url = 'http://localhost:5000/api/v1/users/register';
    const data = {
      name: this.name,
      userName: this.userName,
      email: this.email,
      role: this.role,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
    };

    this.http.post<SignUpResponse>(url, data).subscribe(
      (response) => {
        if (response.status.code == '201') {
          console.log('Success', response);
          this.storeTokenInCookie(response.data.token);
          if (this.getTokenFromCookie()) {
            this.router.navigate(['home']);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    if (
      !this.name ||
      !this.email ||
      !this.userName ||
      !this.role ||
      !this.password ||
      !this.passwordConfirm
    ) {
      this.emptyError = true;
      return;
    }
    if (this.password !== this.passwordConfirm) {
      this.passwordError = true;
      return;
    }
    this.postData();
  }
}
