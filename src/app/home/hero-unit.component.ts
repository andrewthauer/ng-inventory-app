import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-unit',
  template: `
  <div class="pa4 bg-light-gray">
    <blockquote class="athelas ml0 mt0 pl4 black-90 bl bw2 b--blue">
      <p class="f5 f4-m f3-l lh-copy measure mt0">
        Tracking stuff so you don't have to!
      </p>
      <cite class="f6 ttu tracked fs-normal">― AT</cite>
    </blockquote>
  </div>
  `
})
export class HeroUnitComponent { }
