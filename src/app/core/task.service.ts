import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../shared/task.model';
@Injectable()
export class TaskService {
  params: HttpParams;
  constructor(
    private http: HttpClient,
  ) { }

  getVulnCate(): Observable<any>{
    return  this.http.get('api/vulncate/');
  }

  getPlatCate(): Observable<any> {
    return this.http.get('api/platcate/');
  }

  getPoc(pocid): Observable<any> {
    return this.http.get(`api/pocs/${pocid}/`);
  }

  getPocs(filter): Observable<any>  {
    this.params = new HttpParams()
    if (filter.page !== 1) {
      this.params = this.params.set('page', filter.page)
    } else {
      this.params.delete('page')
    }
    if (filter.VulnCate !== '' ){
      this.params = this.params.set('vulncate__name', filter.VulnCate)
    }else{
      this.params.delete('vulncate__name')
    }
    if (filter.PlatCate !== '') {
      this.params = this.params.set('platcate__name', filter.PlatCate)
    }else{
      this.params.delete('platcate__name')
    }
    if (filter.from !== '') {
      this.params = this.params.set('opendate_0', filter.from)
    } else {
      this.params.delete('opendate_0')
    }
    if (filter.to !== '') {
      this.params = this.params.set('opendate_1', filter.to)
    } else {
      this.params.delete('opendate_1')
    }
    if (filter.searchkey !== '') {
      this.params = this.params.set('search', filter.searchkey)
    } else {
      this.params.delete('search')
    }
    return this.http.get('api/pocs/', { params:this.params });
  }

  createTask(task): Observable<any> {
    return this.http.post('api/tasks/create/',task);
  }

  getTasks(filter):Observable<any>  {
    this.params = new HttpParams()
    if (filter.page !== 1) {
      this.params = this.params.set('page', filter.page)
    } else {
      this.params.delete('page')
    }
    if (filter.status !== 'ALL') {
      this.params = this.params.set('status', filter.status)
    } else {
      this.params.delete('page')
    }
    return this.http.get<any>('api/tasks/', { params: this.params });
  }
  getTask(taskid): Observable<any> {
    return this.http.get<any>(`api/tasks/${taskid}/`);
  }

  updateTask(task): Observable<any> {
    return this.http.put(`api/tasks/${task.taskid}/`, { 'action': task.action });
  }

  updateTaskOfItem(item): Observable<any> {
    return this.http.put(`api/tasks/${item.taskid}/items/${item.itemid}/`,{'action':item.action});
  }
}
