import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  confirm(message: string): Observable<Boolean> {
    return Observable.create(observer => {
      const result = window.confirm(message);
      observer.next(result);
      observer.complete();
    });
  }
}
