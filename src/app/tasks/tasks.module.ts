import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TasksRoutingModule } from './tasks-routing.module';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { PocsComponent } from './pocs/pocs.component';
import { MarkdownModule } from 'ngx-md';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MarkdownModule.forRoot(),
    TasksRoutingModule
  ],
  declarations: [HomeComponent, TaskListComponent, TaskCreateComponent, TaskDetailComponent, PocsComponent]
})
export class TasksModule { }
