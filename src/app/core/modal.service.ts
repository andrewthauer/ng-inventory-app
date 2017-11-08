import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Modal } from 'ngx-modialog/plugins/js-native';

@Injectable()
export class ModalService {
  constructor(
    private modal: Modal
  ) { }

  confirm(message: string): Observable<Boolean> {
    return Observable.create(observer => {
      this.modal.confirm()
        .message('Are you sure?').open()
        .result.then(result => {
          observer.next(true);
          observer.complete();
        }).catch(() => {
          observer.next(false);
          observer.complete();
        });
    });
  }
}
