import { Injectable } from '@angular/core';

// declare const toastr: any;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {
    // if (toastr) {
    //   toastr.options.closeButton = true;
    // }
  }

  info(message: string) {
    // if (toastr) {
    //   toastr.info(message);
    // }
  }

  success(message: string) {
    // if (toastr) {
    //   toastr.success(message);
    // }
  }

  warning(message: string) {
    // if (toastr) {
    //   toastr.warning(message);
    // }
  }

  error(message: string) {
    // if (toastr) {
    //   toastr.error(message);
    // }
  }
}
