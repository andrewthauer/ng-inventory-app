import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-title',
  template: `
    <h3>
      {{ title }}
      <ng-content></ng-content>
    </h3>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
  @Input() title: string;
}
