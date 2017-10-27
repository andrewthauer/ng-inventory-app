import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

import { HttpService } from './http.service';
import { Item } from '../models';
import { AppState, ItemActions } from '../stores';
import * as actions from '../stores';

@Injectable()
export class ItemService {
  subject = new BehaviorSubject(null);

  constructor(
    private http: HttpService,
    private store: Store<AppState>,
    private itemActions: ItemActions
  ) { }

  itemsSubject() {
    this.loadItems();
    return this.subject;
  }

  loadItems() {
    // this.http.getItems().subscribe(
    //   items => { this.store.dispatch({ type: ItemActions.LOAD_ITEMS_SUCCESS, payload: items }); },
    //   error => { this.store.dispatch({ type: ItemActions.LOAD_ITEMS_FAILURE, payload: 'something went wrong' }); },
    // );

    // Using an effect
    this.store.dispatch(this.itemActions.loadItems());
  }

  addItem(item: Item = null) {
    // Not using an effect
    const newItem = item || this.buildItem();

    this.http.postItem(newItem).subscribe(
      r => {
        this.store.dispatch(actions.AddItemAction.of(newItem)),
        this.loadItems();
      }
    );
  }

  removeItem(item: Item) {
    return this.http.deleteItem(item.id)
      .subscribe(r => {
        this.loadItems();
      });
  }

  buildItem = (code = 'New Item', name?: string): Item => {
    return { code, name };
  }
}

@Injectable()
export class ItemEffects {
  constructor(
    private actions$: Actions,
    private itemActions: ItemActions,
    private http: HttpService,
  ) { }

  @Effect()
  loadItems$: Observable<Action> = this.actions$
    .ofType(ItemActions.REQUEST_ITEMS)
    .mergeMap(action => this.http.getItems()
      .map(data => this.itemActions.loadItemsSuccess(data))
      .catch(err => of(this.itemActions.loadItemsFailure('failure')))
    );
}
