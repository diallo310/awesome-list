import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'al-workday-form',
  templateUrl: './workday-form.component.html',
  styles: []
})
export class WorkdayFormComponent implements OnInit {
  workdayForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.workdayForm = this.createWorkdayForm();
  }

  createWorkdayForm(): FormGroup {
    return this.formBuilder.group({
      dueDate: ['',
      [Validators.required
      ]],
      tasks: this.formBuilder.array(['',[
        Validators.required,
        Validators.maxLength(6)
      ]]),
      notes: ['',[
        Validators.maxLength(1000)
      ]]
    });
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
    console.info(this.workdayForm.value);
  }

}
