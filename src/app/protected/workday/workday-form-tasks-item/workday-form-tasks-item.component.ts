import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'al-workday-form-tasks-item',
  templateUrl: './workday-form-tasks-item.component.html',
  styles: []
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

}
