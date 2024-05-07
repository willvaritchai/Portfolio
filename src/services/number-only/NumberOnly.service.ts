import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[inputNumberOnly]'
})
export class NumberOnlyService {

  // @Input() numOnlytype: string = '';
  @Input() numOnlyMax: any;
  @Input() isTel: boolean = false;
  @Input() isMinNotOne: boolean = false;

  constructor(private ngControl: NgControl) { }

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    let newValue: any = inputElement.value.replace(/[^0-9]/g, '');
    // Remove leading zeros
    if (newValue == '1' && this.isMinNotOne) {
      newValue = ''
    }
    // สำหรับ validate input tel number
    // if (this.maxLengthTel && inputElement.value.length > this.maxLengthTel) {
    //   newValue = inputElement.value.slice(0, -1)
    // }
    
    // หากเริ่่มด้วย 0 จะ replace เป็น ''
    if (!this.isTel) {
      newValue = newValue.replace(/^0+/, '');
    }

    // Check if the value exceeds the maximum allowed value
    if (this.numOnlyMax) {
      const numericValue = Number(newValue);
      if (numericValue > this.numOnlyMax) {
        newValue = this.numOnlyMax.toString();
      }
    }

    inputElement.value = newValue;

    // Update the value of the associated form control using NgControl
    this.ngControl.control?.setValue(newValue && !this.isTel ? parseInt(newValue) : newValue);
  }
}