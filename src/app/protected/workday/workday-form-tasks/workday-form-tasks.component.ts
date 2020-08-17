import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'al-workday-form-tasks',
  templateUrl: './workday-form-tasks.component.html',
  styles: []
})
export class WorkdayFormTasksComponent implements OnInit {

  @Input() workdayForm: FormGroup;
  @Input() tasks: FormArray;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

  }

  createTaskForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(150)
      ]],
      todo: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ]],
      done: 0
    });
  }

  onAddedTask() {
    const task = this.createTaskForm();
    this.tasks.push(task);
  }

  onRemovedTask(index: number) {
    this.tasks.removeAt(index);
  }

}
