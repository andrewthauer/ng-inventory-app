import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';

const components = [HeaderComponent, NotFoundComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [...components],
  exports: [...components],
  providers: [],
})
export class ShellModule {}
