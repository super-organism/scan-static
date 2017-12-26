import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Group } from '../shared/group.model';
import { User } from '../shared/user.model';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  
  constructor(
    private http: HttpClient,
  ) { }

  getGroup(): Observable<Group[]> {
    return this.http.get<Group[]>('api/groups/');
  }

  signUp(user: User): Observable<any> {
    return this.http.post('api/signup/', user);
  }

  signIn(credentials: any): Observable<any> {
    return this.http.post('api/signin/', credentials);
  }

  reSetPasswd(password: string): Observable<any>{
    return this.http.post('api/users/', password);
  }

  getUser(): Observable<any> {
    let jwtHelper: JwtHelper = new JwtHelper();
    const token = localStorage.getItem('token');
    const user = jwtHelper.decodeToken(token)
    return this.http.get<User>(`api/users/${user.uid}/`);
  }

  saveToken(token){
    window.localStorage['token'] = token;
  }

  getToken() {
    return window.localStorage['token'];
  }

  deleteToken() {
    window.localStorage.removeItem('token');
  }
}
