import { Component } from '@angular/core';

@Component({
  template: `
    <app-hero-unit>
      <blockquote>
        Tracking stuff so you don't have to!
      </blockquote>
    </app-hero-unit>

    <h2 class="tc">
      <a routerLink="/items">See Inventory</a>
    </h2>
  `
})
export class HomeComponent { }
