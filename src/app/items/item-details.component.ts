import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: 'item-details.component.html'
})
export class ItemDetailsComponent implements OnInit {
  id: number;
  private sub: any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(p => this.id = +p.id);
  }
}
