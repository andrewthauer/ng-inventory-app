import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  template: `
    <h3>
      {{ title }}
      <ng-content></ng-content>
    </h3>
  `,
})
export class TitleComponent {
  @Input() title: string;
}
