import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from './user.service';
import {
  Observable,
  Subject,
  Subscription,
  delay,
  filter,
  forkJoin,
  map,
  of,
  takeUntil,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnDestroy {
  public users: Observable<User[]>;

  public today = new Date();

  public semaforoSubscription?: Subscription;

  public allSubs: Subscription[] = [];

  public destroyed = new Subject<boolean>();

  public loading = false;
  public nombres: string[] = [];
  public numeros: number[] = [];

  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    private notifier: NotifierService,
    @Inject('IS_DEV') private isDev: boolean
  ) {
    this.users = this.userService.getUsers().pipe(

      tap((valorOriginal) => console.log('VALOR ANTES DEL MAP', valorOriginal)),

      map((valorOriginal) =>
        valorOriginal.map((usuario) => ({
          ...usuario,
          name: usuario.name.toUpperCase(),
          surname: usuario.surname.toUpperCase(),
        }))
      ),

      tap((valorMapeado) => console.log('VALOR DESPUES DEL MAP', valorMapeado))
    );

    const obs1$ = of(['Prueba1', 'Prueba2', 'Prueba3']).pipe(delay(3000));
    const obs2$ = of([1, 2, 3, 4, 5]).pipe(delay(3000), map((r) => r.map((n) => n + 2)));

    this.loading = true;

    forkJoin([
      obs1$,
      obs2$
    ]).subscribe({
      next: ([nombres, numeros]) => {
        this.nombres = nombres;
        this.numeros = numeros;
      },
      complete: () => (this.loading = false),
    });

    this.userService.loadUsers();

    const meDevuelveElDinero = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);

      }, 2000);
    });

    const semaforo = new Observable<string>((subscriber) => {
      let color = 'verde';
      setInterval(() => {
        color === 'verde' ? subscriber.next('rojo') : subscriber.next('verde');
        if (color === 'verde') {
          subscriber.next('rojo');
          color = 'rojo';
        } else {
          subscriber.next('verde');
          color = 'verde';

        }
      }, 1000);
    });
  }

  ngOnDestroy(): void {
    console.log('SE DETRUYO');

    this.destroyed.next(true);
  }

  onCreateUser(): void {
    this.matDialog
      .open(UserFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {

            this.notifier.showSuccess('Se cargaron los usuarios correctamente');

            this.userService.createUser({
              id: new Date().getTime(),
              name: v.name,
              email: v.email,
              password: v.password,
              surname: v.surname,
            });
            console.log('RECIBIMOS EL VALOR: ', v);
          } else {
            console.log('SE CANCELO');
          }
        },
      });
  }

  onDeleteUser(userToDelete: User): void {
    if (confirm(`¿Está seguro de eliminar a ${userToDelete.name}?`)) {
    }
  }

  onEditUser(userToEdit: User): void {
    this.matDialog
      .open(UserFormDialogComponent, {
        data: userToEdit,
      })
      .afterClosed()
      .subscribe({
        next: (userUpdated) => {
          console.log(userUpdated);
          if (userUpdated) {

          }
        },
      });
  }
}
