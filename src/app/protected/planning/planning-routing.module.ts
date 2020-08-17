import { Routes, RouterModule } from '@angular/router';
import { PlanningComponent } from './planning/planning.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: PlanningComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlanningRoutingModule {}
