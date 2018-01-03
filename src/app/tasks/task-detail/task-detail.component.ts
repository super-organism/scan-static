import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TaskService } from '../../core/task.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task ={
    resultcount:0,
    target:'',
    status:'',
    startt:'',
    items: [],
  };
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getTask()
    setInterval(() => { this.getTask(); }, 5000); 
  }

  getTask() {
    this.route.paramMap.switchMap((params: ParamMap) =>
      this.taskService.getTask(params.get('id'))).subscribe(
      res => {this.task = res;},
      error => { }
      );
  }

  UpdateTask(task){
    let updatetask = {
      'taskid': this.task['taskid'],
      'action': ''
    }
    if (task.status === 'RUNNING') {
      updatetask.action = 'STOP'
    }
    if (task.status === 'STOP') {
      updatetask.action = 'RETRY'
    }
    this.taskService.updateTask(updatetask).subscribe(
      res => {this.task = res},
      error => { }
    );
  }

  UpdateItem(item){
    let updateitem ={
      'taskid':this.task['taskid'],
      'itemid':item.itemid,
      'action':''
    }
    if(item.status ==='RUNNING'){
      updateitem.action = 'STOP'
    }
    if (item.status === 'STOP') {
      updateitem.action = 'RETRY'
    }
    this.taskService.updateTaskOfItem(updateitem).subscribe(
      res => {item.status = `${res.status}`},
      error =>{}
    );
  }

  setClass(item){
    let itemclass ={}
    if (item.status ==='RUNNING') {
      itemclass = { 'table-active' :true}
    }
    if (item.status === 'OVER') {
      if (item.result) {
        itemclass = { 'table-danger': true }
      }
      itemclass = { 'table-success': true }
    }
    if (item.status === 'STOP') {
      itemclass = { 'table-warning': true }
    }
    return itemclass;
  }
}
