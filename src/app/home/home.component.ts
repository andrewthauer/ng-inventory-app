import { Component } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent {
  oneTwoThree = [
    { text: 'one', delay: 1000, color: 'red' },
    { text: 'two', delay: 2000, color: 'green' },
    { text: 'three', delay: 3000, color: 'blue' },
  ];
}
