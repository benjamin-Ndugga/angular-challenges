import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities$ | async"
      class="bg-light-orange"
      (add)="addCity()">
      <img src="assets/img/city.png" width="200px" />
      <
      <ng-template #rowRef let-city>
        <app-list-item (delete)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-orange {
        background-color: rgba(164, 164, 94, 0.8);
      }
    `,
  ],
  imports: [ListItemComponent, CardComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  cities$ = toObservable(this.store.cities);

  constructor(
    private readonly store: CityStore,
    private readonly http: FakeHttpService,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
