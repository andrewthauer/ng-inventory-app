import { Component, ApplicationRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Inventory Trax';

  // constructor(app: ApplicationRef) {
  //   setInterval(() => {
  //     app.tick();
  //   }, 1000);
  // }
}
