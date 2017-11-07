import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Store } from '@ngrx/store';
import { AppState } from '../../store';

import { itemActions, itemSelector} from '../store';
import { Item, ItemService } from '../shared';

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
  public model: Item;
  protected isBusy: Observable<Boolean>;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.isBusy = this.store.select(state => state.data.items.isBusy);

    this.subscription = this.route.params.subscribe(p => {
      this.itemService.selectOne(+p.id)
        .subscribe(i => this.model = i.item);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(item) {
    this.itemService.saveItem(item);
    // TODO: What's the best way to navigate back saveItem.done???
  }

  onCancel() {
    this.navigateToList();
  }

  private navigateToList() {
    this.router.navigateByUrl('/items');
  }
}
