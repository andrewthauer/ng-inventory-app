import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="tc">
      <a routerLink="/" class="link f-headline-s">
        <h1>{{ title }}</h1>
      </a>
    </header>
  `,
})
export class HeaderComponent {
  @Input() title: string;
}
