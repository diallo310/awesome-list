import { Routes, RouterModule } from '@angular/router';
import { WorkdayComponent } from './workday/workday.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: WorkdayComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkdayRoutingModule { }
