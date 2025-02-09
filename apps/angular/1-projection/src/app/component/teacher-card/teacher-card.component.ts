// import { Component, inject, OnInit } from '@angular/core';
// import { FakeHttpService } from '../../data-access/fake-http.service';
// import { TeacherStore } from '../../data-access/teacher.store';
// import { CardType } from '../../model/card.model';
// import { CardComponent } from '../../ui/card/card.component';

// @Component({
//   selector: 'app-teacher-card',
//   template: `
//     <app-card
//       [list]="teachers()"
//       [type]="cardType"
//       customClass="bg-light-red"></app-card>
//   `,
//   styles: [
//     `
//       ::ng-deep .bg-light-red {
//         background-color: rgba(250, 0, 0, 0.1);
//       }
//     `,
//   ],
//   imports: [CardComponent],
// })
// export class TeacherCardComponent implements OnInit {
//   private http = inject(FakeHttpService);
//   private store = inject(TeacherStore);

//   teachers = this.store.teachers;
//   cardType = CardType.TEACHER;

//   ngOnInit(): void {
//     this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
//   }
// }

import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';

import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers$ | async"
      class="bg-light-red"
      (add)="addTeacher()">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template #rowRef let-teacher>
        <app-list-item (delete)="deleteTeacher(teacher.id)">
          {{ teacher.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit {
  teachers$ = toObservable(this.store.teachers);

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
