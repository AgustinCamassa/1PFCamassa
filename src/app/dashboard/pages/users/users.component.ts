import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';

const ELEMENT_DATA: User[] = [
  {
    id: 1,
    name: 'Agustin',
    surname: 'Camassa',
    email: 'ag@mail.com',
    password: '2222',
  },
];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users: User[] = ELEMENT_DATA;

  public today = new Date();

  constructor(private matDialog: MatDialog) {

  }

  onCreateUser(): void {
    this.matDialog

      .open(UserFormDialogComponent)

      .afterClosed()

      .subscribe({
        next: (v) => {
          if (v) {

            this.users = [
              ...this.users,
              {
                id: this.users.length + 1,
                name: v.name,
                email: v.email,
                password: v.password,
                surname: v.surname,
              },
            ];
            console.log('RECIBIMOS EL VALOR: ', v);
          } else {
            console.log('SE CANCELO');
          }
        },
      });
  }

  onDeleteUser(userToDelete: User): void {
    if (confirm(`¿Está seguro de eliminar a ${userToDelete.name}?`)) {
      this.users = this.users.filter((u) => u.id !== userToDelete.id);
    }
  }

  onEditUser(userToEdit: User): void {
    this.matDialog

    .open(UserFormDialogComponent, {
      data: userToEdit
    })

    .afterClosed()

    .subscribe({
      next: (userUpdated) => {
        console.log(userUpdated)
        if (userUpdated) {
          this.users = this.users.map((user) => {
            return user.id === userToEdit.id
              ? { ...user, ...userUpdated }
              : user
          })
        }
      },
    });
  }
}
