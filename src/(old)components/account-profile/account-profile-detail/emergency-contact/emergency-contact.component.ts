import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil, Subject, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/components/confirm-dialog/confirm-dialog.component';
import { AppComponent } from 'src/app/app.component';
import { imgAsset } from 'src/environment-variables/img.asset.service';
import { FilesManagementService } from 'src/services/FilesManagementService.service';
import { urlService } from 'src/environment-variables/url.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ValidateFormsService } from 'src/services/ValidateFormService.service';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';
import { AccountProfileService } from '../../account-profile.service';

declare var window: any;

@Component({
  selector: 'emergency-contact',
  templateUrl: './emergency-contact.component.html',
})
export class EmergencyContactComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  userCookie: any
  disableBtn: boolean = true
  contactPersonWarn: boolean = false
  contactTelWarn: boolean = false
  contactFormGroup: FormGroup;

  contactData: any
  isEdit: boolean = false

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   * @param {UserProfileListService} _userProfileListService
   */
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private cookieService: CookieService,
    private dialog: MatDialog,
    private _filesManagementService: FilesManagementService,
    private _appComponent: AppComponent,
    private _validateFormsService: ValidateFormsService,
    private _getExtraDataService: GetExtraDataService,
    private _accountProfileService: AccountProfileService,

  ) {
    this.contactFormGroup = this._formBuilder.group({
      encrypt_id: [null],// encryptUserId
      encryptContactId: [null],
      user_id: [null, Validators.required],
      contact_person: [null, Validators.required],
      contact_number: [null, Validators.required],
    });

    this.contactFormGroup.get('contact_person')?.valueChanges.subscribe(value => {
      let formName = 'contact_person'
      if (_validateFormsService.checkValidateSpace(formName, value)) {
        this.contactFormGroup.get(formName)?.setValue(value.trimStart())
      }
    })

    this.contactFormGroup.valueChanges.subscribe((value) => {
      if (this._validateFormsService.validateForm(this.contactFormGroup).length > 0) {
        this.disableBtn = true
      } else {
        if (this.validateLength(this.contactFormGroup.get('contact_person')?.value, this.contactFormGroup.get('contact_number')?.value)) {
          this.disableBtn = false
        } else {
          this.disableBtn = true
        }
      }
    });
  }

  ngOnInit() {
    console.clear();
    this.userCookie = this._getExtraDataService.getUserFromCookie()

    this._accountProfileService.contactData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      if (result.response_code == 200) {
        window.alertClose()
        console.log('contactData pipe()');
        this.contactData = result.data
        this.contactFormGroup.patchValue(result.data)
        this.contactFormGroup.get('user_id')?.setValue(this.userCookie.user_id)
        this.contactFormGroup.get('encrypt_id')?.setValue(this.userCookie.encrypt_id)
      } else {
        window.alertFail(result.response_desc)
      }
      this._changeDetectorRef.markForCheck()
    })
  }

  getEmergencyContact(param: any) {
    this._accountProfileService.getEmergencyContact(param).pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      if (result.response_code != 200) {
        window.alertFail(result.response_desc)
      }
    })
  }

  validateLength(personData: any, telData: any): boolean {
    let validatePerson = this._validateFormsService.validateMinLength(personData, 3)
    let validateContactNum = this._validateFormsService.validatePassLength(telData, 10)
    validatePerson == false ? this.contactPersonWarn = true : this.contactPersonWarn = false
    validateContactNum == false ? this.contactTelWarn = true : this.contactTelWarn = false
    return validatePerson && validateContactNum
  }

  go(url: string) {
    this._appComponent.go(url);
  }

  saveContact() {
    window.alertLoading()
    console.log(this.contactFormGroup.value);
    let data = this.contactFormGroup.value
    // data.encrypt_id = this.userCookie.encrypt_id

    // ถ้าไม่มี encryptContactId == createContact
    if (!data.encryptContactId) {
      console.log('createContact');
      this._accountProfileService.createContact(data).pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
        if (result.response_code == 200) {
          let param = { encrypt_id: this.userCookie.encrypt_id }
          this.getEmergencyContact(param)
          // this._changeDetectorRef.markForCheck()
        } else {
          window.alertFail(result.response_desc)
        }
      })
    } else {
      // updateContact
      this._accountProfileService.updateEmergencyContact(data).pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
        if (result.response_code == 200) {
          window.alertClose()
          this.isEdit = false
          this.contactFormGroup.patchValue(result.data)
          this.contactData = this.contactFormGroup.value
          this._changeDetectorRef.markForCheck()
        } else {
          window.alertFail(result.response_desc)
        }
      })

    }

  }

  deleteContact() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      width: '100%',
      data: 'delete-contact'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        window.alertLoading()
        const enContactId = this.contactFormGroup.get('encryptContactId')?.value
        this._accountProfileService.deleteEmergencyContact(enContactId).pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
          if (result.response_code == 200) {
            this.contactFormGroup.reset()
            let param = { encrypt_id: this.userCookie.encrypt_id }
            this.getEmergencyContact(param)
          } else {
            window.alertFail(result.response_desc)
          }
        })
      }
    })
  }



  callEmergencyContact() {
    const contact_number = this.contactFormGroup.get('contact_number')?.value
    window.open('tel:' + contact_number);
  }







}
