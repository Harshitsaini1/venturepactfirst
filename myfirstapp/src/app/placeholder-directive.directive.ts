import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]',
})
export class PlaceholderDirectiveDirective {
  constructor(public viewContRef: ViewContainerRef) {}
}
