import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { createbookResponse } from 'src/representation/createBookResponse';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css'],
})
export class EditbookComponent {
  @Input() selectedBook: any;
  @Input() tab: any;
  @Output() dataUpdated = new EventEmitter<any>();

  constructor(private http: HttpClient, private cookie: CookieService) {}

  allError: string = '';
  successMessage: string = '';

  bookNull() {
    this.dataUpdated.emit(false);
  }

  postData() {
    const token = this.cookie.get('userToken');
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = 'http://localhost:5000/api/v1/books/edit';
    const body = this.selectedBook;
    this.http
      .put<createbookResponse>(url, body, { headers: headers })
      .subscribe(
        (response) => {
          if (response.status.code == '200') {
            this.selectedBook.title = '';
            this.selectedBook.author = '';
            this.selectedBook.pages = '';
            this.selectedBook.description = '';
            this.selectedBook.publisher = '';
            this.selectedBook.totalCopies = 0;
            this.selectedBook.copies = 0;
            this.selectedBook.year = 0;
            this.selectedBook.edition = '';
            this.selectedBook.language = '';
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
      !this.selectedBook.title ||
      !this.selectedBook.author ||
      !this.selectedBook.pages ||
      !this.selectedBook.description ||
      !this.selectedBook.publisher ||
      !this.selectedBook.totalCopies ||
      !this.selectedBook.copies ||
      !this.selectedBook.year ||
      !this.selectedBook.edition ||
      !this.selectedBook.language
    ) {
      this.allError = 'Please enter all the required fields';
      return;
    }

    this.postData();
  }

  onValueChange() {}
}
