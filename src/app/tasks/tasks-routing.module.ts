import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { PocsComponent } from './pocs/pocs.component';
const routes: Routes = [
  { 
    path: '', component: HomeComponent,
    children: [
      {
        path: 'list',
        component: TaskListComponent,
      },
      {
        path: 'create',
        component: TaskCreateComponent,
      },
      {
        path: 'detail/:id',
        component: TaskDetailComponent,
      },
      {
        path: 'pocs/:id',
        component: PocsComponent,
      }
    ]
 },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
