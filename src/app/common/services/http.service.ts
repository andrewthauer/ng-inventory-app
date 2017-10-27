import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

import { Item } from '../models';

const BASE_URL = 'http://localhost:3000';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<Item[]>(`${BASE_URL}/items/`);
  }

  postItem(item: Item) {
    return this.http.post(`${BASE_URL}/items/`, item);
  }

  deleteItem(itemId: number) {
    return this.http.delete(`${BASE_URL}/items/${itemId}`);
  }
}
