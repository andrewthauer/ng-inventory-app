import { Component } from '@angular/core';
import { ModalService } from '../core/services/modal.service';

@Component({
  template: `
    <h2>Lazy?</h2>
    <p>This page was lazy loaded</p>
    <button (click)="openDialog()">Open Dialog</button>
  `,
})
export class LazyPageComponent {
  constructor(private modalService: ModalService) {}

  openDialog() {
    this.modalService.confirm('hello');
  }
}
