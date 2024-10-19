import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { Observable } from 'rxjs';
import { APIResponse, User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private https: HttpClient) { }

  getUsers(limit:number, skip: number,select: string, sortBy: string, sortOrder:string): Observable<APIResponse> {
    return this.https.get<APIResponse>(`${environment.apiUrl}/users?limit=${limit}&skip=${skip}&select=${select}&sortBy=${sortBy}&order=${sortOrder}`).pipe();
  }

  searchUsers(limit:number, skip: number, select: string,searchVal: string): Observable<APIResponse> {
    return this.https.get<APIResponse>(`${environment.apiUrl}/users/search?limit=${limit}&skip=${skip}&select=${select}&q=${searchVal}`).pipe();
  }
}
