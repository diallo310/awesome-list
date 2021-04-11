import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { WorkdaysService } from 'src/app/core/services/workdays.service';
import { Workday } from 'src/app/shared/models/workday';

@Component({
  selector: 'al-workday-form',
  templateUrl: './workday-form.component.html',
  styles: []
})
export class WorkdayFormComponent implements OnInit {
  workdayForm: FormGroup;
  workdayId: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private workdaysService: WorkdaysService,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.workdayId = '';
      this.workdayForm = this.createWorkdayForm();
      if (params.date) {
        const date: Date = new Date(+params.date);
        this.dueDate.setValue(date);
      }
    });
  }

  createWorkdayForm(): FormGroup {
    return this.formBuilder.group({
      dueDate: ['',
        [Validators.required
        ]],
      tasks: this.formBuilder.array([], [Validators.required]),
      notes: ['', [
        Validators.maxLength(1000)
      ]]
    });
  }

  onDateSelected(displayDate: string) {
    const userId: string = this.authService.currentUser.id;
    this.workdaysService.getWorkdayByDate(displayDate, userId).subscribe(workday => {
      this.resetWorkdayForm();
      if (!workday) { return; }
      this.workdayId = workday.id;
      this.notes.setValue(workday.notes);
      workday.tasks.forEach(task => {
        const taskField: FormGroup = this.formBuilder.group({
          title: task.title,
          todo: task.todo,
          done: task.done
        });
        this.tasks.push(taskField);
      });
    });
  }

  resetWorkdayForm() {
    while (this.tasks.length !== 0) {
      this.tasks.removeAt(0);
    }
    this.notes.reset();
  }

  get dueDate() {
    return this.workdayForm.get('dueDate');
  }

  get tasks() {
    return this.workdayForm.get('tasks') as FormArray;
  }

  get notes() {
    return this.workdayForm.get('notes');
  }

  submit(): void {
    const userId: string = this.authService.currentUser.id;

    if (this.workdayId) {
      const workday: Workday = new Workday({ ...{ id: this.workdayId }, ...this.workdayForm.value });
      workday.userId = userId;

      this.workdaysService.update(workday).subscribe(
        _ => this.router.navigate(['/app/planning']),
        _ => this.workdayForm.reset()
      );
      return;
    }

    const workday: Workday = new Workday({ ...this.workdayForm.value });
    workday.userId = userId;

    this.workdaysService.save(workday).subscribe(
      _ => this.router.navigate(['/app/planning']),
      _ => this.workdayForm.reset()
    );
  }

}
