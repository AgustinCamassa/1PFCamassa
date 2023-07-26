import { Injectable } from '@angular/core';
import { User } from './models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'Agustin',
      surname: 'Camassa',
      email: 'ag@gmail.com',
      password: '222222',
    },
  ];

  private subjectUsers$ = new Subject<User[]>();

  private sendNotification$ = new Subject<string>();
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  constructor() {

    this.sendNotification$.subscribe({
      next: (message) => alert(message),
    })
  }

  sendNotification(notification: string): void {
    this.sendNotification$.next(notification);
  }

  loadUsers(): void {
    this._users$.next(this.users);
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  createUser(user: User): void {
    this.users = [
      ...this.users,
      user,
    ]
  }
}
