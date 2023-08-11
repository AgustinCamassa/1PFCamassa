import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './models';
import { BehaviorSubject, Observable, Subject, delay, map, merge, mergeMap, of, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';
import { generarStringAleatorio } from 'src/app/shared/utils/helpers';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) {}

  loadUsers(): void {
    this.httpClient.get<User[]>(environment.baseApiUrl + '/users').subscribe({
      next: (response) => {
        this._users$.next(response);
      },
      error: () => {
        this.notifier.showError('Error al cargar los usuarios');
      }
    })
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getUserById(id: number) {
    return this.users$.pipe(
      take(1),
      map(( users ) =>  users.find((u) => u.id === id)),
    )
  }

  createUser(payload: CreateUserData): void {
    const token = generarStringAleatorio(20);

    this.httpClient.post<User>(environment.baseApiUrl + '/users', {...payload, token})
    .pipe(
      mergeMap((userCreate) => this.users$.pipe(
        take(1), map(
          (arrayActual) => [...arrayActual, userCreate])
        )
      )
    )
    .subscribe({
      next: (arrayActualizado) => {
        this._users$.next(arrayActualizado);
      }
    })
  }

  updateUserById(id: number, usuarioActualizado: UpdateUserData): void {
    this.httpClient.put(environment.baseApiUrl + '/users/' + id, usuarioActualizado).subscribe({
      next: () => this.loadUsers(),
    })
  }

  deleteUserById(id: number): void {
    this.httpClient.delete(environment.baseApiUrl + '/users/' + id)
      .pipe(
        mergeMap(
          (responseUserDelete) => this.users$.pipe(
            take(1), 
            map((arrayActual) => arrayActual.filter((u) => u.id !== id))
          )
        )
      ).subscribe({
        next: (arrayActualizado) => this._users$.next(arrayActualizado),
      })
  }
}
