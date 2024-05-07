import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[preventInput]'
})
export class PreventInputService {

  private originalValue: string = '';

  constructor(private el: ElementRef, private ngControl: NgControl) {}

  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent) {
    // Store the original value when the input is focused
    this.originalValue = this.el.nativeElement.value;
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    // Revert the value to the original value when input changes
    this.el.nativeElement.value = this.originalValue;
    // Update the value of the associated form control using NgControl
    this.ngControl.control?.setValue(this.originalValue)
  }
}