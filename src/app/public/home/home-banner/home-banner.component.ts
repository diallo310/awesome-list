import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'al-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {
  public prefix = 'app';
  public dashboardPath = `${this.prefix}/dashboard`;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(page: string): void {
    this.router.navigate([page]);
  }

}
