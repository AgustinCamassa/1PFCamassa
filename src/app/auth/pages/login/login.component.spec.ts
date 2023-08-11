import { TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component"
import { MatFormFieldControl } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";


describe('LoginComponent', () => {
    let component: LoginComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [MatFormFieldControl, MatInputModule]
        })
        component = TestBed.createComponent(LoginComponent).componentInstance
    })

    it('El formulario debe ser inválido si los campos muestran la pantalla en blanco', () => {
        component.emailControl.setValue('');
        component.passwordControl.setValue('');

        expect(component.loginForm.invalid).toBe(true);
    })
})