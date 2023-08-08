
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { UsersComponent } from "./pages/users/users.component";
import { UserDetailComponent } from "./pages/users/pages/user-detail/user-detail.component";
import { ProductsComponent } from "./pages/products/products.component";
import { TeachersComponent } from "./pages/teachers/teachers.component";
import { StudentsComponent } from "./pages/students/students.component";
import { InscriptionsComponent } from "./pages/inscriptions/inscriptions.component";
import { CoursesComponent } from "./pages/courses/courses.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                // /dashboard/home
                path: 'home',
                component: HomeComponent,
              },
              {
                path: 'users',
                loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule),
              },
              {
                path: 'products',
                loadChildren: () => import('./pages/products/products.module').then((m) => m.ProductsModule),
              },
              {
                path: 'teachers',
                loadChildren: () => import('./pages/teachers/teachers.module').then((m) => m.TeachersModule),
              },
              {
                path: 'students',
                loadChildren: () => import('./pages/students/students.module').then((m) => m.StudentsModule),
              },
              {
                path: 'inscriptions',
                loadChildren: () => import('./pages/inscriptions/inscriptions.module').then((m) => m.InscriptionsModule),
              },
              {
                path: 'courses',
                loadChildren: () => import('./pages/courses/courses.module').then((m) => m.CoursesModule),
              },
              {
                path: '**',
                redirectTo: 'home',
              },
        ])
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule{}