import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

import { Item } from './item.model';

const BASE_URL = 'http://localhost:3000';

@Injectable()
export class ItemPersistenceService {
  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<Item[]>(`${BASE_URL}/items/`);
  }

  getItem(id: number) {
    return this.http.get<Item>(`${BASE_URL}/items/${id}`);
  }

  saveItem(item: Item): Observable<Item> {
    if (item.id >= 1) {
      return this.http.put<Item>(`${BASE_URL}/items/${item.id}`, item);
    } else {
      return this.http.post<Item>(`${BASE_URL}/items/`, item);
    }
  }

  deleteItem(item: Item): Observable<Item> {
    return this.http.delete<Item>(`${BASE_URL}/items/${item.id}`)
      .map(() => item);
  }
}
