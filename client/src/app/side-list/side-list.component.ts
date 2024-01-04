import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { getMeResponse } from 'src/representation/getMeResponse';

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.css'],
})
export class SideListComponent implements OnInit {
  userName: string = '';
  role: string = '';
  email: string = '';
  id: string = '';
  constructor(private cookie: CookieService, private http: HttpClient) {}

  clearCookies() {
    this.cookie.delete('userToken', '/');
  }

  getMe() {
    const token = this.cookie.get('userToken');
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = 'http://localhost:5000/api/v1/users/getMe';
    this.http.get<getMeResponse>(url, { headers: headers }).subscribe(
      (response) => {
        if (response.status.code == '200') {
          this.userName = response.data.username;
          this.role = response.data.role;
          this.email = response.data.email;
          this.id = response.data.id;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.getMe();
  }
}
