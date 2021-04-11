import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'al-workday-form-tasks-item',
  templateUrl: './workday-form-tasks-item.component.html',
  styleUrls: ['./workday-form-tasks-item.component.scss']
})
export class WorkdayFormTasksItemComponent implements OnInit {
  @Input() task: FormGroup;
  @Input() index: number;
  @Input() isFirst: boolean;
  @Input() isLast: boolean;

  @Output() removedTask = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  removeTask(index: number) {
    this.removedTask.emit(index);
  }

  selectTodo(todo: number) {
    this.task.patchValue({ todo: todo });
  }

  get todo() {
    return this.task.get('todo');
  }

  get title() {
    return this.task.get('title');
  }

}
