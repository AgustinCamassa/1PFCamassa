import { Injectable } from "@angular/core";
import { LoginPayLoad } from "../model";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { User } from "src/app/dashboard/pages/users/models";
import { NotifierService } from "src/app/core/services/notifier.service";
import { Router } from "@angular/router";


@Injectable({ providedIn:  'root'})
export class AuthService {

    private _authUser$ = new BehaviorSubject<User | null>(null);
    public authUser$ = this._authUser$.asObservable();

    constructor (private notifier: NotifierService, private router: Router) {}

    isAuthenticated(): Observable<boolean> {
        return this.authUser$.pipe(
            take(1),
            map((user) => !!user),
            );
    }

    login(payLoad: LoginPayLoad): void {
        const MOCK_USER: User = {
            id: 23,
            name: 'Mockname',
            surname: 'Mocksurname',
            email: 'moke@email.com',
            password: '123456',
        }

        if (payLoad.email === MOCK_USER.email && payLoad.password === MOCK_USER.password) {
            this._authUser$.next(MOCK_USER);
            this.router.navigate(['/dashboard'])
        } else {
            this.notifier.showError('Datos inválidos');
            this._authUser$.next(null);
        }
    }
}