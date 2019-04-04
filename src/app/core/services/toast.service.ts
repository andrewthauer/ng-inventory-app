import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

const snackBarConfig: MatSnackBarConfig = {
  verticalPosition: 'top',
  duration: 2000,
};

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  info(message: string) {
    this.snackBar.open(message, '', {
      ...snackBarConfig,
      panelClass: 'bg-info',
    });
  }

  success(message: string) {
    this.snackBar.open(message, '', {
      ...snackBarConfig,
      panelClass: 'bg-success',
    });
  }

  warning(message: string) {
    this.snackBar.open(message, '', {
      ...snackBarConfig,
      panelClass: 'bg-warning',
    });
  }

  error(message: string) {
    this.snackBar.open(message, '', {
      ...snackBarConfig,
      panelClass: 'bg-error',
    });
  }
}
