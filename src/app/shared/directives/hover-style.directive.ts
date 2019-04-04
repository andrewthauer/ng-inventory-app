import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({ selector: '[appHoverStyle]' })
export class HoverStyleDirective {
  style: string;

  constructor(private element: ElementRef) {}

  @Input()
  set appHoverStyle(style: string) {
    this.style = style;
  }

  @HostListener('mouseover')
  onMouseover() {
    this.element.nativeElement.style = this.style;
  }

  @HostListener('mouseleave')
  onMouseleave() {
    this.element.nativeElement.style = null;
  }
}
