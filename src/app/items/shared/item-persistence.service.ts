import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

import { AppConfigToken, AppConfig } from '../../app.config';
import { Item } from './item.model';

@Injectable()
export class ItemPersistenceService {
  serviceUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(AppConfigToken) appConfig: AppConfig
  ) {
    this.serviceUrl = appConfig.serviceUrl;
  }

  getItems(searchText?: string) {
    if (searchText) {
      return this.http.get<Item[]>(`${this.serviceUrl}/items/?name_like=${searchText}`);
    } else {
      return this.http.get<Item[]>(`${this.serviceUrl}/items/`);
    }
  }

  getItem(id: number) {
    return this.http.get<Item>(`${this.serviceUrl}/items/${id}`);
  }

  saveItem(item: Item): Observable<Item> {
    if (item.id >= 1) {
      return this.http.put<Item>(`${this.serviceUrl}/items/${item.id}`, item);
    } else {
      return this.http.post<Item>(`${this.serviceUrl}/items/`, item);
    }
  }

  deleteItem(item: Item): Observable<Item> {
    return this.http.delete<Item>(`${this.serviceUrl}/items/${item.id}`)
      .map(() => item);
  }
}
