import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { allBooksResponse } from 'src/representation/allBooksResponse';
import { filter } from 'rxjs';

@Component({
  selector: 'app-allbooks',
  templateUrl: './allbooks.component.html',
  styleUrls: ['./allbooks.component.css'],
})
export class AllbooksComponent implements OnInit {
  allBooks: Array<any> = [];
  tab: Boolean = false;
  selectedBook = {};
  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  selectBook(book: Object) {
    this.selectedBook = book;
  }

  updateParentObject(updatedData: any) {
    // Handle the updated data in the parent component
    this.tab = updatedData;
  }

  handleEdit(book: Object) {
    this.selectBook(book);
    this.tab = true;
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Fetch or refresh book data here
      });

    const token = this.cookie.get('userToken');
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = 'http://localhost:5000/api/v1/books/';
    this.http.get<allBooksResponse>(url, { headers: headers }).subscribe(
      (response) => {
        if (response.status.code == '200') {
          this.allBooks = response.data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
{
}
