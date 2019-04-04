import { Injectable } from '@angular/core';
import * as toastr from 'toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {
    toastr.options.closeButton = true;
  }

  info(message: string) {
    toastr.info(message);
  }

  success(message: string) {
    toastr.success(message);
  }

  warning(message: string) {
    toastr.warning(message);
  }

  error(message: string) {
    toastr.error(message);
  }
}
