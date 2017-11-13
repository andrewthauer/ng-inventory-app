import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';

import { routerActions } from '../../store';
import { Item } from '../models';
import { ItemsState, itemActions } from '../store';
import * as itemSelectors from '../store/selectors';

@Component({
  selector: 'app-item-detail',
  template: `
    <app-title title="Item Details">
      <i class="fa fa-spinner fa-spin" *ngIf="(isBusy | async)"></i>
    </app-title>
    <app-item-form [model]="model" (onSubmit)="onSubmit($event)" (onCancel)="onCancel()"></app-item-form>
  `
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  protected model: Item;
  protected isBusy: Observable<Boolean>;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<ItemsState>,
  ) {
    this.isBusy = this.store.select(itemSelectors.getIsBusy);
    this.store.select(itemSelectors.getSelected)
      .subscribe(item => this.model = item);
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

  private navigateToList() {
    this.router.navigateByUrl('/items');
  }
}
