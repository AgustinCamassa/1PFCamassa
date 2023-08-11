import { Injectable } from "@angular/core";
import { LoginPayLoad } from "./model";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { User } from "src/app/dashboard/pages/users/models";
import { NotifierService } from "src/app/core/services/notifier.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";


@Injectable({ providedIn:  'root'})
export class AuthService {

    private _authUser$ = new BehaviorSubject<User | null>(null);
    public authUser$ = this._authUser$.asObservable();

    constructor (
        private notifier: NotifierService, 
        private router: Router,
        private httpClient: HttpClient,
        ) {}

    isAuthenticated(): Observable<boolean> {
        return this.httpClient.get<User[]>('http://localhost:3000/users', {
            params: {
                token: localStorage.getItem('token') || 'invalido',
            }
        }).pipe(
            map((userResult) => {
                return !!userResult.length
            })
        )
    }

    login(payLoad: LoginPayLoad): void {
        this.httpClient.get<User[]>('http://localhost:3000/users', {
            params: {
                email: payLoad.email || '',
                password: payLoad.password || ''
            }
        }).subscribe({
            next: (response) => {
                if (response.length) {
                    const authUser = response[0];
                    this._authUser$.next(authUser);
                    this.router.navigate(['/dashboard']);
                    localStorage.setItem('token', authUser.token);
                } else {
                    this.notifier.showError('Datos inválidos');
                    this._authUser$.next(null);
                }
            },
            error: (err) => {
                this.notifier.showError('Error de conexión con el servidor')
            }
        })
    }
}