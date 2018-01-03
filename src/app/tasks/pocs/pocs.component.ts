import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TaskService } from '../../core/task.service';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-pocs',
  templateUrl: './pocs.component.html',
  styleUrls: ['./pocs.component.scss']
})
export class PocsComponent implements OnInit {
  poc ={
    name:'',
    vulncate:'',
    platcate:'',
    fixs:'',
    desc:'',
    opentime:''
  };
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getPoc()
  }
  getPoc(){
    this.route.paramMap.switchMap((params: ParamMap) =>
      this.taskService.getPoc(params.get('id'))).subscribe(
        res =>{this.poc =res},
        error =>{}
      );
  }

}
