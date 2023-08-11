import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AuthService } from "./auth.service";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { User } from "../dashboard/pages/users/models";
import { RouterMock } from "../core/mocks/router.mock";
import { Router } from "@angular/router";

describe('AuthService', () => {
    let service: AuthService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                {
                    provide: Router,
                    useClass: RouterMock,
                }
            ]
        });
        service = TestBed.inject(AuthService);
        httpController = TestBed.inject(HttpTestingController);
    })

    it('Si el login es válido el observable authUser$ debe emitir un valor', () => {
        const mockUser: User = {
            id: 1,
            email: 'fake@mail.com',
            password: '123456',
            name: 'Fake',
            surname: 'User',
            token: 'dijicacopajcivnei',
        }

        const mockResponse: User[] = [mockUser];
        service.login({
            email: mockUser.email,
            password: mockUser.password
        });

        httpController.expectOne({
            method: 'GET',
            url: `http://localhost:3000/users?email=${mockUser.email}&password=${mockUser.password}`
        }).flush(mockResponse)
    })
})