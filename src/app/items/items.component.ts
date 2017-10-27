import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'items',
  template: `
    <div>
    <a routerLink="/home">Home</a>
      <item-list></item-list>
    </div>
  `
})
export class ItemsComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
