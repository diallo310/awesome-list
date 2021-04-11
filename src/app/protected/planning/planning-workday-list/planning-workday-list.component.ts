import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { WorkdaysService } from 'src/app/core/services/workdays.service';
import { Workday } from 'src/app/shared/models/workday';


@Component({
  selector: 'al-planning-workday-list',
  templateUrl: './planning-workday-list.component.html'
})
export class PlanningWorkdayListComponent implements OnInit, OnDestroy {

  workdays: Workday[];
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private workdayService: WorkdaysService) { }

  ngOnInit() {
    const id: string = this.authService.currentUser.id;
    this.subscription = this.workdayService.getWorkdayByUser(id).subscribe(workdays => this.workdays = workdays);
  }

  onWorkdayRemoved(workday: Workday) {
    this.workdayService.remove(workday)
      .subscribe(_ => {
        this.workdays =
          this.workdays.filter(el => el.id !== workday.id);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
