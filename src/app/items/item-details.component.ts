import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { AppState, itemActions, itemSelector} from '../common/state';
import { Item } from '../common/models';
import { ItemService } from '../common/services';

@Component({
  selector: 'app-item-details',
  templateUrl: 'item-details.component.html'
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  public model;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(p => {
      this.model = this.itemService.selectOne(+p.id);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
