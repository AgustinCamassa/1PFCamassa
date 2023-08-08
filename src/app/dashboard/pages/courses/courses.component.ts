import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from './models';
import { CourseService } from '../courses/course.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: [
  ]
})
export class CoursesComponent implements OnInit, OnDestroy {

  //public dataSource: Course[] = [];

  public data$: Observable<Course[]>;

  public displayedColumns = ['id', 'name', 'price', 'actions'];

  constructor(private courseService: CourseService) {
    this.data$ = this.courseService.getCourses();
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.courseService.loadCourses();
  }

  onCreate(): void {
    this.courseService.create();
  }

  onDelete(id: number): void {
    this.courseService.deleteById(id);
  }
}
