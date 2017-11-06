import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// import { ConfirmService } from '../components/confirm';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class DirtyGuard implements CanDeactivate<ComponentCanDeactivate> {
  // constructor(private confirmService: ConfirmService) {}

  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    if (component.canDeactivate()) {
      return true;
    }

    return true;

    // return this.confirmService.confirm(
    //   'Are you sure you want to discard changes?'
    // );
  }
}
