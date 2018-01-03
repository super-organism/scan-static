import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/task.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';
import { validateConfig } from '@angular/router/src/config';
@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  VulnCate = [];
  PlatCate = [];
  poccount = 0;
  pocs = [];
  selectpocs =[];
  selectedAll = false;

  selectfrom ={};
  selectto = {};
  pocfilter={
    'VulnCate':'',
    'PlatCate':'',
    'searchkey':'',
    'from':'',
    'to':'',
    'page':1
  }
  
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
    this.getVulnCate()
    this.getPlatCate()
    this.getPocs()
  }


  getVulnCate(){
    this.taskService.getVulnCate().subscribe(
      res => { this.VulnCate = res },
      error=>{ }
    );
  }
  getPlatCate(){
    this.taskService.getPlatCate().subscribe(
      res => { this.PlatCate = res },
      error => { }
    );
  }

  setFilter(Cate,filter){
    if (Cate === 'Vuln') {
      this.pocfilter.searchkey =''
      this.pocfilter.VulnCate =filter
    }
    if (Cate === 'Plat') {
      this.pocfilter.searchkey = ''
      this.pocfilter.PlatCate = filter
    }
    if(Cate === 'From'){
      if(filter){
        this.pocfilter.from = `${filter.year}-${filter.month}-${filter.day}`
      }else{
        this.pocfilter.from =''
      }
    }
    if (Cate === 'To') {
      if (filter) {
        this.pocfilter.to = `${filter.year}-${filter.month}-${filter.day}`
      } else {
        this.pocfilter.to = ''
      }
    }
    if (Cate === 'Search') {
      if (filter) {
        this.pocfilter.searchkey = filter;
      } else {
        this.pocfilter.to = ''
      }
    }
    this.getPocs()
  }

  getPocs(){
    this.taskService.getPocs(this.pocfilter).subscribe(
      res => {
        const tmp = [];
        this.poccount =res.count;
        res.results.forEach(element => {
          if(this.selectpocs.findIndex(poc => poc.puid === element.puid)===-1){
            element.selected = false ;
            tmp.push(element)
          }
        });
        this.pocs = this.selectpocs.concat(tmp)
      },
      error=>{}
    );
  }

  selectAll() {
    for (var i = 0; i < this.pocs.length; i++) {
      this.pocs[i].selected = this.selectedAll;
      if (this.selectedAll){
        if (this.selectpocs.findIndex(p => p.puid === this.pocs[i].puid) ===-1){
          this.selectpocs.push(this.pocs[i])
        }
      }else{
        if (this.selectpocs.findIndex(p => p.puid === this.pocs[i].puid) !==-1) {
          let index = this.selectpocs.findIndex(p => p.puid === this.pocs[i].puid)
          this.selectpocs.splice(index,1)
        }
      }
    }
  }
  selectTo(poc){
    this.selectedAll = this.pocs.every(function (item: any) {
      return item.selected == true;
    })
    if (poc.selected) {
      if (this.selectpocs.findIndex(p => p.puid === poc.puid)===-1){
        this.selectpocs.push(poc)
      }
    }else{
      let index = this.selectpocs.findIndex(p => p.puid === poc.puid)
      this.selectpocs.splice(index,1)
    }
  }

  validateTarget(c: FormControl) {
    let URL_REGEXP = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/i;
    return URL_REGEXP.test(c.value) ? null : {
      validateTarget: {
        valid: false
      }
    };
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
        this.validateTarget,
        Validators.minLength(6)
      ]);
      this.targets.push(target);
    }else{
      this.toast.setMessage('Message','you max 5 targets', 'warning');
    }
  }
  removeTarget(index){
    if (this.targets.length>1){
      this.targets.removeAt(index);
    } else {
      this.toast.setMessage('Message','you min 1 targets', 'warning');
    }
    
  }
  submit(){
    let targets = this.taskForm.value.targets
    let pocs =[];
    if(this.selectpocs.length==0){
      return this.toast.setMessage('Message', 'must to select poc', 'warning');
    }else{
      this.selectpocs.forEach(element => {
        pocs.push(element.puid)
      });
    }
    targets.forEach(element => {
      let value = {
        'target' :element,
        'pocs' :pocs
      }
      this.taskService.createTask(value).subscribe(
        res => { this.toast.setMessage('Message', `have create ${targets.length} tasks`, 'success');},
        error =>{
          this.toast.setMessage('Message', 'have same error', 'danger');
        }
      )
    });
    setTimeout(() => { this.router.navigate(['/home', 'list']); }, 2000);
  }
  changePage() {
    this.getPocs()
  }

}
