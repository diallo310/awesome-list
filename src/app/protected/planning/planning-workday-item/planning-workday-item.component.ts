import { Component, OnInit, Input, SimpleChange, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'al-planning-workday-item',
  templateUrl: './planning-workday-item.component.html',
  styles: []
})
export class PlanningWorkdayItemComponent implements OnChanges {
  @Input() dueDate: string;
  @Input() doneTasks: number | string;
  @Input() remainingTasks: number | string;
  @Output() workDayRemoved = new EventEmitter();

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (const propName in changes) {
      this.update(propName, changes[propName].currentValue);
    }

  }

  update(propName, propValue) {
    switch (propName) {
      case 'dueDate': {
        if ('Lundi' === propValue) { this.dueDate += '(Aujourd\'hui)'; }
        break;
      } case 'doneTasks': {
        if (propValue === 0) { this.doneTasks = 'Aucune tâche terminé.'; }
        break;
      } case 'remainingTasks': {
        if (propValue === 0) { this.remainingTasks = 'Journée de travail terminée !'; }
        break;
      } default: {
        break;
      }
    }

  }

  removeWorkday(dueDate: string) {
    this.workDayRemoved.emit(dueDate);
  }
  /*private currentWorkday;
    @Input('workday')
    set workday(workday) {
      this.currentWorkday = workday || {};
      if ('Lundi' === workday.dueDate) {
        this.currentWorkday.dueDate += ' (Aujourd\'hui)';
      }
    }
   */

}
