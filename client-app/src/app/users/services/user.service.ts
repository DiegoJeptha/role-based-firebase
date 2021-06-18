import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
export type CreateUserRequest = { displayName: string, password: string, email: string, role: string }
export type UpdateUserRequest = { uid: string } & CreateUserRequest

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:5001/role-based-auth-b808e/us-central1/api/users";

  constructor(
    private http: HttpClient
  ) { }

  get users$(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(`${this.baseUrl}`).pipe(
      map(result => {
        return result.users;
      })
    );
  }

  user$(id: string): Observable<User> {
    return this.http.get<{ user: User }>(`${this.baseUrl}/${id}`).pipe(
      map(result => {
        return result.user;
      })
    );
  }

  create(user: CreateUserRequest) {
    return this.http.post(`${this.baseUrl}`, user).pipe(
      map(_ => { })
    );
  }

  edit(user: UpdateUserRequest) {
    return this.http.patch(`${this.baseUrl}/${user.uid}`, user).pipe(
      map(_ => { })
    );
  }
}
