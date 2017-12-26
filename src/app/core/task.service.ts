import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../shared/task.model';
@Injectable()
export class TaskService {

  constructor(
    private http: HttpClient,
  ) { }

  getVulnCate(): Observable<any>{
    return  this.http.get('api/vulncate/');
  }

  getPlatCate(): Observable<any> {
    return this.http.get('api/platcate/');
  }

  getPocs(params): Observable<any>  {
    
    return this.http.get('api/pocs/');
  }

  createTask(task:Task) {
    return this.http.post('api/tasks/create/',task);
  }

  getTasks():Observable<any>  {
    return this.http.get<any>('api/tasks/');
  }

  // updateTask(task:Task) {
  //   this.http.post('api/tasks/${id}').subscribe();
  // }

  // updateTaskOfItem(item:Item) {
  //   this.http.post('api/tasks/').subscribe();
  // }
}
