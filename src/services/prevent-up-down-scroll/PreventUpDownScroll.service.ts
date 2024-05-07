import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[preventUpDownScroll]'
})
export class PreventUpDownScroll {

  @HostListener('keydown', ['$event'])
  onKeydownPrevent(event: KeyboardEvent): void {
    // Prevent ArrowUp and ArrowDown keys
    if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      event.preventDefault();
    }
  }

  @HostListener('wheel', ['$event'])
  onWheelPrevent(event: WheelEvent): void {
    // Prevent mouse wheel scrolling
    event.preventDefault();
  }
}
