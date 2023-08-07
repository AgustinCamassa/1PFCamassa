import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Course } from './models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses$ = new BehaviorSubject<Course[]>([]);

  constructor() { }

  getCourses(): Observable<Course[]> {
    return this.courses$.asObservable();
  }

  loadCourses(): void {
    this.courses$.next([
      {
        id: 1,
        name: "Desarrollo Web",
        description: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        price: 40000,
      },
      {
        id: 2,
        name: "JavaScript",
        description: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        price: 47000,
      },
      {
        id: 3,
        name: "React js",
        description: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        price: 42000,
      },
    ])
  }

  create(): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.courses$.next([
          ...arrayActual,
          {
            id: arrayActual.length + 1,
            name: "xxxxxxx",
            description: "xxxxxxxx",
            price: 111111,
          },
        ]);
      },
    });
  }

  deleteById(id: number): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.courses$.next(
          arrayActual.filter((p) => p.id !== id),
        );
      }
    })
  }
}