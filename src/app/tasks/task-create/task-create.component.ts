import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/task.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  pocs = [];
  taskForm: FormGroup;
  constructor(
    private taskService: TaskService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: ToastComponent
  ) { }

  ngOnInit() {
    this.setForm()
    this.addTarget()
  }

  getPocs(){
    const params =''
    this.taskService.getPocs(params).subscribe(
      res=>{},
      error=>{}
    );
  }

  setForm(){
    this.taskForm = this.formBuilder.group({ targets: this.formBuilder.array([])});
  }

  get targets(): FormArray {
    return this.taskForm.get('targets') as FormArray;
  };

  addTarget(){

    if (this.targets.length<5) {
      const target = new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]);
      this.targets.push(target);
    }else{
      this.toast.setMessage('you max 5 targets', 'warning');
    }
  }
  removeTarget(index){
    if (this.targets.length>1){
      this.targets.removeAt(index);
    } else {
      this.toast.setMessage('you min 1 targets', 'warning');
    }
    
  }
  submit(){

  }

}
