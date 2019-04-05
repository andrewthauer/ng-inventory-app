import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { routerActions } from '../../store';
import { Item } from '../models';
import { ItemState, itemActions } from '../store';
import * as itemSelectors from '../store/selectors';

@Component({
  selector: 'app-item-detail',
  template: `
    <app-title title="Item Details">
      <i class="fa fa-spinner fa-spin" *ngIf="(isBusy | async)"></i>
    </app-title>
    <app-item-form
      [model]="model"
      (onSubmit)="onSubmit($event)"
      (onCancel)="onCancel()"
    ></app-item-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  model: Item;
  isBusy: Observable<Boolean>;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<ItemState>) {
    this.isBusy = this.store.select(itemSelectors.getIsBusy);
    this.store
      .select(itemSelectors.getSelected)
      .subscribe(item => (this.model = item));
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(p => {
      const id = +p.id;
      this.store.dispatch(itemActions.selectOne(id));
      this.store.dispatch(itemActions.loadOne.started(id));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(item) {
    this.store.dispatch(itemActions.saveOne.started(item));
  }

  onCancel() {
    this.store.dispatch(routerActions.back());
  }
}
