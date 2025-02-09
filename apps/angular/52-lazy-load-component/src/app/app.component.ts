import { CommonModule, NgComponentOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- <div class="h-screen bg-gray-500">
      @if (topLoaded()) {
        <app-top />
      } @else {
        <app-placeholder />
        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="topLoaded.set(true)">
          Load Top
        </button>
      }
    </div> -->
    <div class="h-screen bg-gray-500">
      <ng-container *ngIf="topLoaded(); else placeholder">
        <ng-container *ngComponentOutlet="topComponent"></ng-container>
      </ng-container>
      <ng-template #placeholder>
        <app-placeholder />
        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="loadTopComponent()">
          Load Top
        </button>
      </ng-template>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, NgComponentOutlet],
})
export class AppComponent {
  topLoaded = signal(false);
  topComponent: any;

  loadTopComponent() {
    import('./top.component').then(({ TopComponent }) => {
      this.topComponent = TopComponent;
      this.topLoaded.set(true);
    });
  }
}
