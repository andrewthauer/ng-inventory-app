import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  template: '<h2>Page not found</h2>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
