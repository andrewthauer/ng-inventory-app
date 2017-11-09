import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

import { AppConfigToken, AppConfig } from '../../app.config';
import { Item } from './item.model';
import { ItemFilters } from './item-filters.model';

@Injectable()
export class ItemPersistenceService {
  serviceUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(AppConfigToken) appConfig: AppConfig
  ) {
    this.serviceUrl = appConfig.serviceUrl;
  }

  getItems(filters?: ItemFilters) {
    const query = filters ? `?q=${filters.searchText}` : '';
    return this.http.get<Item[]>(`${this.serviceUrl}/items/${query}`);
  }

  getItem(id: number) {
    return this.http.get<Item>(`${this.serviceUrl}/items/${id}`);
  }

  saveItem(item: Item): Observable<Item> {
    const id = item.id >= 1 ? `${item.id}` : '';
    return this.http.put<Item>(`${this.serviceUrl}/items/${id}`, item);
  }

  deleteItem(item: Item): Observable<Item> {
    return this.http.delete<Item>(`${this.serviceUrl}/items/${item.id}`)
      .map(() => item);
  }
}
