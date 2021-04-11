import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'al-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  public prefix = 'app';
  public dashboardPath = `${this.prefix}/dashboard`;
  public planningPath = `${this.prefix}/planning`;
  public workdayPath = `${this.prefix}/workday`;
  public profilPath = `${this.prefix}/profil`;
  public parametersPath = `${this.prefix}/parameters`;
  public user: User;
  public subscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user =>
      this.user = user
    );
  }

  navigate(page: string): void {
    this.router.navigate([page]);
  }

  isActive(page: string): boolean {
    return this.router.isActive(page, true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
