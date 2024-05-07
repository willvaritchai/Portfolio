// file.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidateFormsService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  checkValidateFormGroup(formGroup: FormGroup, isAccountForm: boolean = false) {
    if (!isAccountForm) {
      // Check if only one control has a null or empty value
      const controlsWithNullOrEmpty = Object.keys(formGroup.controls).filter(key => {
        const control = formGroup.get(key);
        console.log('key: ', control?.value === null || control?.value === '' ? key : null);
        return control?.value === null || control?.value === '';
      });
      // console.log('check: ', controlsWithNullOrEmpty.length);
      console.log('length: ', controlsWithNullOrEmpty.length);
      // not found null or '' of formGroup
      if (controlsWithNullOrEmpty.length == 0) {
        console.log('enable');
        return true
      }
      // found null or '' of formGroup
      else if (controlsWithNullOrEmpty.length > 0) {
        console.log('disble');
        return false
      }
    }
    // สำหรับ control ของ <account> เนื่องจาก มีเงื่อนไขที่ต่างจาก form แบบอื่น
    else {
      const controlsWithNullOrEmpty = Object.keys(formGroup.controls).filter(key => {
        const control = formGroup.get(key);
        return control?.value === null || control?.value === '';
      });

      if (controlsWithNullOrEmpty.length > 1) {
        return true // เจอ 
      } else {
        return false // ไม่เจอ
      }
    }
    return
  }

  // วิธีการ validate ที่น่าสนใจกว่าเดิม
  validateForm(formGroup: FormGroup, errType: string = 'required') {
    let checkValidate = Object.keys(formGroup.controls).filter(key => {
      const control = formGroup.get(key);
      if (control?.hasError(errType)) {
        return true;
      }
      return false;
    });
    return checkValidate
  }

  checkValidateSpace(formName: string, value: any) {
    // Check if the first character is a space
    if (value) {
      if (value.length > 0 && value[0] === ' ') {
        // If it is, remove the leading space
        return true
      }
    }

    return false
  }

  validateMinLength(value: any, minLength: number): boolean {
    if (value?.length < minLength) {
      return false
    }
    return true
  }

  validatePassLength(value: any, passLength: number): boolean {
    if (!isNaN(value)) {
      // console.log('เป็นตัวเลข');
      value = String(value)
    }
    // console.log(value); 
    if (value?.length != passLength) {
      // console.log('ไม่ผ่าน 10 หลัก');

      return false
    }
    return true
  }
}
