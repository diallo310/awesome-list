import { Component, Input, OnInit } from '@angular/core';
import { interval, Observable, of, Subject } from 'rxjs';
import { delay, map, takeUntil, takeWhile } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { WorkdaysService } from 'src/app/core/services/workdays.service';
import { Task } from 'src/app/shared/models/task';
import { Workday } from 'src/app/shared/models/workday';


@Component({
  selector: 'al-dashboard-workday',
  templateUrl: './dashboard-workday.component.html',
  styles: [`
    img{
      width: 50px;
      height: 50px;
  }
  `]
})
export class DashboardWorkdayComponent implements OnInit {
  @Input() workday: Workday;
  isWorkdayComplete: boolean;
  isPomodoroActive: boolean;
  startPomodoro$: Subject<string>;
  cancelPomodoro$: Subject<string>;
  completePomodoro$: Subject<string>;
  currentProgress: number;
  maxProgress: number;
  pomodoro$: Observable<number>;

  constructor(
    private workdaysService: WorkdaysService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isPomodoroActive = false;
    this.startPomodoro$ = new Subject();
    this.cancelPomodoro$ = new Subject();
    this.completePomodoro$ = new Subject();
    this.currentProgress = 0
    this.maxProgress = 5;
    this.pomodoro$ = interval(1000).pipe(
      takeUntil(this.cancelPomodoro$),
      takeUntil(this.completePomodoro$),
      takeWhile(progress => progress <= this.maxProgress),
      map(x => x + 1));
    this.getCurrentTask()
    this.isWorkdayComplete = (this.getCurrentTask() === undefined);
    this.maxProgress = this.authService.currentUser.pomodoroDuration;
  }

  startPomodoro() {
    this.isPomodoroActive = true;
    this.startPomodoro$.next('start');
    this.pomodoro$.subscribe(currentProgress => {
      this.currentProgress = currentProgress;
      if (currentProgress === this.maxProgress) {
        of(0).pipe(delay(500)).subscribe(_ => this.completePomodoro());
      }
    });
  }

  cancelPomodoro() {
    this.isPomodoroActive = false;
    this.cancelPomodoro$.next('cancel');
  }

  completePomodoro() {
    this.completePomodoro$.next('complete');
    this.isPomodoroActive = false;
    const currentTask = this.getCurrentTask();
    if (currentTask) {
      currentTask.done++;
    }
    this.isWorkdayComplete = (this.getCurrentTask() === undefined);
    this.workdaysService.update(this.workday).subscribe();
  }

  getCurrentTask(): Task | undefined {
    return this.workday.tasks.find((task: Task) => task.todo > task.done);
  }

}

