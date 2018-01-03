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
  task_count = {
    all: 0,
    over: 0,
    stop: 0
  };
  filter ={
    status :'ALL',
    page :1,
  }
  collectionSize =0
  constructor(
    private taskService:TaskService,
  ) { }

  ngOnInit() {
    this.getTasks()
    setInterval(() => { this.getTasks(); },5000); 
  }

  setFilter(Cate, filter) {
    if(Cate === 'status'){
      this.filter.status = filter
    }
    this.filter.page = 1
    this.getTasks()
  }

  getTasks(){
    this.taskService.getTasks(this.filter).subscribe(
      res => { 
        this.tasks =res.results;
        this.task_count = res.task_count;
        this.collectionSize =res.count;
      },
      error => { }
    );
  }
  UpdateTask(task) {
    let updatetask = {
      'taskid': task['taskid'],
      'action': ''
    }
    if (task.status === 'RUNNING') {
      updatetask.action = 'STOP'
      this.task_count.stop+=1
    }
    if (task.status === 'STOP') {
      updatetask.action = 'RETRY'
      this.task_count.stop -= 1
    }
    this.taskService.updateTask(updatetask).subscribe(
      res => { task.status = `${res.status}`},
      error => { }
    );
  }
  changePage(){
    this.getTasks()
  }

  setClass(task) {
    let itemclass = {}
    if (task.status === 'RUNNING') {
      itemclass = { 'table-active': true }
    }
    if (task.status === 'OVER') {
      itemclass = { 'table-success': true }
    }
    if (task.status === 'STOP') {
      itemclass = { 'table-warning': true }
    }
    return itemclass;
  }

}
