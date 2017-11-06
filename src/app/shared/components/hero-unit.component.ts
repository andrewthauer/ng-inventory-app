import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-unit',
  template: `
  <div class="center tc pv5 pv5-ns bg-light-gray">
    <section class="lh-title">
      <ng-content></ng-content>
    </section>
  </div>
  `
})
export class HeroUnitComponent {
}
