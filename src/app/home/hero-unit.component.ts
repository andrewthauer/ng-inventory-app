import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-unit',
  template: `
    <div class="pa6 bg-light-gray">
      <p class="tc f5 f4-m f3-l lh-copy mt0">
        Tracking stuff so you don't have to!
      </p>
      <p class="tc f4 f4-m f3-l lh-copy mt0" *appDelay="2000; let time = loadTime">
        <span appHoverStyle="color: red;">
          The future took: {{ time | date:'s' }} seconds!
        </span>
      </p>
    </div>
  `
})
export class HeroUnitComponent { }
