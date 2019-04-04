import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  styles: [''],
  template: `
    <div class="card pa4 dib tc bw1 b--solid br3 b--light-gray">
      <ng-content select="[card-header]"></ng-content>
      <ng-content select="[card-body]"></ng-content>
      <ng-content select="[card-footer]"></ng-content>
    </div>
  `,
})
export class CardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
