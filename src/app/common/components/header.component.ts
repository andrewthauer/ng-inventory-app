import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <header>
    <div style="text-align:center">
      <h1>
        Welcome to {{title}}!
      </h1>
    </div>
  </header>
  `
})
export class HeaderComponent {
  @Input() title: string;
}
