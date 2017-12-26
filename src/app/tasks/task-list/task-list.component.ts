import { Component, OnInit } from '@angular/core';
import { Task } from '../../shared/task.model';
import { TaskService } from '../../core/task.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks = [];
  constructor(
    private taskService:TaskService,
  ) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(){
    this.taskService.getTasks().subscribe(
      res => { this.tasks =res.results,
        console.log(this.tasks)
      },
      error => { }
    );
  }
}
