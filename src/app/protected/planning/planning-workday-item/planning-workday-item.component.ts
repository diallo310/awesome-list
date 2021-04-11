import { Component, OnInit, Input, SimpleChange, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Workday } from 'src/app/shared/models/workday';

@Component({
  selector: 'al-planning-workday-item',
  templateUrl: './planning-workday-item.component.html',
  styles: []
})
export class PlanningWorkdayItemComponent {
  @Input() workday: Workday;
  @Output() workDayRemoved = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  goWorkday(workday: Workday) {
    this.router.navigate(
      ['app/workday'],
      {
        queryParams: {
          date: workday.dueDate
        }
      }
    );
  }
  removeWorkday() {
    this.workDayRemoved.emit(this.workday);
  }


}
