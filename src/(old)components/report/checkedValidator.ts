import { AbstractControl, ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';

export function atLeastOneCheckboxCheckedValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const controls = (formGroup as FormGroup).controls;
    const isChecked = Object.keys(controls)
      .some(controlName => controls[controlName].value === true);

    return isChecked ? null : { 'atLeastOneCheckboxChecked': true };
  };
}