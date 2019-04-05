import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hero-unit',
  template: `
    <div class="pa4 bg-moon-gray">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroUnitComponent {}
