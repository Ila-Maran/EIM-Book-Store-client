import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(private cookie: CookieService, private router: Router) {}

  ngOnInit(): void {
    const myCookie = this.cookie.get('userToken');
    if (!myCookie) {
      this.router.navigate(['/']);
    }
  }
}
