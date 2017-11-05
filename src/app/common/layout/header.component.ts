import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <header class="tc">
    <a routerLink="/home" class="link">
      <h1 class="f-headline-s">{{title}}</h1>
    </a>
  </header>
  `
})
export class HeaderComponent {
  @Input() title: string;
}
