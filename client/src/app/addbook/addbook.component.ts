import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { createbookResponse } from 'src/representation/createBookResponse';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
})
export class AddbookComponent {
  title: string = '';
  author: string = '';
  pages: string = '';
  description: string = '';
  publisher: string = '';
  totalCopies: number = 0;
  copies: number = 0;
  year: number = 0;
  edition: string = '';
  language: string = '';
  allError: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private cookie: CookieService) {}

  onValueChange() {
    this.allError = '';
  }

  postData() {
    const token = this.cookie.get('userToken');
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = 'http://localhost:5000/api/v1/books/create';
    const body = {
      title: this.title,
      author: this.author,
      pages: this.pages,
      description: this.description,
      publisher: this.publisher,
      totalCopies: this.totalCopies,
      copies: this.copies,
      year: this.year,
      edition: this.edition,
      language: this.language,
    };
    this.http
      .post<createbookResponse>(url, body, { headers: headers })
      .subscribe(
        (response) => {
          if (response.status.code == '201') {
            this.title = '';
            this.author = '';
            this.pages = '';
            this.description = '';
            this.publisher = '';
            this.totalCopies = 0;
            this.copies = 0;
            this.year = 0;
            this.edition = '';
            this.language = '';
            this.successMessage = response.status.message;
            setTimeout(() => {
              this.successMessage = '';
            }, 3000);
          } else if (response.status.code == '400') {
            this.allError = `${response.status.message}. Try again.`;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  handleSubmit() {
    if (
      !this.title ||
      !this.author ||
      !this.pages ||
      !this.description ||
      !this.publisher ||
      !this.totalCopies ||
      !this.copies ||
      !this.year ||
      !this.edition ||
      !this.language
    ) {
      this.allError = 'Please enter all the required fields';
      return;
    }

    this.postData();
  }
}
