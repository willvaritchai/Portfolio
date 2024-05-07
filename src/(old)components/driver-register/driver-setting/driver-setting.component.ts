import { ChangeDetectorRef, Component, Input, OnInit, Pipe, PipeTransform, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, startWith, takeUntil, timeout } from 'rxjs/operators';
import { Observable, Subject, interval } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { FilesManagementService } from 'src/services/FilesManagementService.service';
import { DriverRegisterService } from '../driver-register.service';
import { AppComponent } from 'src/app/app.component';
import * as e from 'cors';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/components/confirm-dialog/confirm-dialog.component';
import { ValidateFormsService } from 'src/services/ValidateFormService.service';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

declare var window: any
@Component({
  selector: 'register',
  templateUrl: './driver-setting.component.html',
})
export class DriverSettingComponent implements OnInit {
  @ViewChild('license') inputLicense: any;
  @ViewChild('vehicle') inputVehicle: any;

  //  non-null assertion operator (!) to tell TypeScript that you are confident that the autocomplete property will be initialized before it's accessed
  // @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;

  @Input() type: string | undefined;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  filteredVehicleType: Observable<any[]> = new Observable<any[]>;

  userData: any
  vehicleTypes: any[] = ['รถยนต์', 'มอเตอร์ไซค์'];

  data_license: any[] = [];
  licenseImgObj: any
  data_vehicle: any[] = [];
  vehicleImgObj: any
  licenseDetail: any

  licensePic: string = ''
  vehiclePic: string = ''


  driverProfile: any
  addVehicleCheck: boolean = false
  disbleBtn: boolean = true

  licenseFormGroup: FormGroup
  vehicleFormGroup: FormGroup
  /**
       * Constructor
       *
       * @param {HttpClient} _httpClient
       */
  constructor(
    // private _userService: SigninService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private _filesManagementService: FilesManagementService,
    private _driverRegisterService: DriverRegisterService,
    private appComponent: AppComponent,
    private dialog: MatDialog,
    private _validateFormsService: ValidateFormsService,
  ) {
    this.licenseFormGroup = this._formBuilder.group({
      user_id: [null, Validators.required],
      license_fn: ['', Validators.required],
      license_ln: ['', Validators.required],
      license_size: ['', Validators.required],
    });
    this.vehicleFormGroup = this._formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      vehicle_type: ['', Validators.required],
      vehicle_color: ['', Validators.required],
      license_plate: ['', Validators.required],
      seats: ['', Validators.required],

    });

    let formName: string

    this.licenseFormGroup.get('license_fn')?.valueChanges.subscribe(value => {
      formName = 'license_fn'
      if (_validateFormsService.checkValidateSpace(formName, value)) {
        this.licenseFormGroup.get(formName)?.setValue(value.trimStart())
      }
    })

    this.licenseFormGroup.get('license_ln')?.valueChanges.subscribe(value => {
      formName = 'license_ln'
      if (_validateFormsService.checkValidateSpace(formName, value)) {
        this.licenseFormGroup.get(formName)?.setValue(value.trimStart())
      }
    })

    this.vehicleFormGroup.get('brand')?.valueChanges.subscribe(value => {
      formName = 'brand'
      if (_validateFormsService.checkValidateSpace(formName, value)) {
        this.vehicleFormGroup.get(formName)?.setValue(value.trimStart())
      }
    })
    this.vehicleFormGroup.get('model')?.valueChanges.subscribe(value => {
      formName = 'model'
      if (_validateFormsService.checkValidateSpace(formName, value)) {
        this.vehicleFormGroup.get(formName)?.setValue(value.trimStart())
      }
    })
    this.vehicleFormGroup.get('vehicle_type')?.valueChanges.subscribe(value => {
      formName = 'vehicle_type'
      if (_validateFormsService.checkValidateSpace(formName, value)) {
        this.vehicleFormGroup.get(formName)?.setValue(value.trimStart())
      }
    })

    this.vehicleFormGroup.get('vehicle_color')?.valueChanges.subscribe(value => {
      formName = 'vehicle_color'
      if (_validateFormsService.checkValidateSpace(formName, value)) {
        this.vehicleFormGroup.get(formName)?.setValue(value.trimStart())
      }
    })

    this.vehicleFormGroup.get('license_plate')?.valueChanges.subscribe(value => {
      formName = 'license_plate'
      if (_validateFormsService.checkValidateSpace(formName, value)) {
        this.vehicleFormGroup.get(formName)?.setValue(value.trimStart())
      }
    })

    // filter-vehicleTypes
    this.filteredVehicleType = this.vehicleFormGroup.get('vehicle_type')?.valueChanges.pipe(
      startWith(''),
      map(value => this._vehicleTypeFilter(value))
    ) as Observable<any[]>;
  }

  private _vehicleTypeFilter(value: any): any[] {
    return this.vehicleTypes
  }
  displayVehicleTypes(vType: any): string {
    return vType;
  }

  ngOnInit() {
    this._changeDetectorRef.markForCheck()
    if (this.cookieService.check('user')) {
      const userFromStoreData = this.cookieService.get('user');
      this.userData = JSON.parse(userFromStoreData);
      this.licenseFormGroup.get('user_id')?.setValue(this.userData.user_id)

      this.getDriverProfile()
    }

    this.licenseFormGroup.valueChanges.subscribe(l => {
      this.checkValidateFormGroup(this.licenseFormGroup)
    })
    this.vehicleFormGroup.valueChanges.subscribe(v => {
      this.checkValidateFormGroup(this.vehicleFormGroup)
    })

  }

  checkValidateFormGroup(formGroup: FormGroup) {
    // ถ้ามีภาพ license or มี license-profile แล้ว ค่อยผ่านเงื่อนไขถัดไป
    if ((this.licenseImgObj || this.licenseDetail) && this.vehicleImgObj) {
      if (this._validateFormsService.validateForm(formGroup).length > 0) {
        this.disbleBtn = true
      } else {
        this.disbleBtn = false
      }
    } else {
      this.disbleBtn = true
    }

  }

  // checkValidateFormGroup(formGroup: FormGroup) {
  //   console.log('license-obj', this.licenseImgObj);
  //   console.log('vehicle-obj', this.vehicleImgObj);

  //   if ((this.licenseImgObj || this.licenseDetail) && this.vehicleImgObj) {
  //     // Check if only one control has a null or empty value
  //     const controlsWithNullOrEmpty = Object.keys(formGroup.controls).filter(key => {
  //       const control = formGroup.get(key);
  //       console.log('key: ', control?.value === null || control?.value === '' ? key : null);
  //       return control?.value === null || control?.value === '';
  //     });
  //     // console.log('check: ', controlsWithNullOrEmpty.length);
  //     console.log('length: ', controlsWithNullOrEmpty.length);
  //     if (controlsWithNullOrEmpty.length == 0) {
  //       console.log('enable');
  //       this.setDisbleBtn(false)
  //     }
  //     else if (controlsWithNullOrEmpty.length > 0) {
  //       console.log('disble');
  //       this.setDisbleBtn(true)
  //     }
  //   } else {
  //     console.log('disble');
  //     this.setDisbleBtn(true)
  //   }
  // }

  setDisbleBtn(status: boolean) {
    this.disbleBtn = status
    this._changeDetectorRef.markForCheck()
  }

  getDriverProfile(successStatus: boolean = false) {
    this._driverRegisterService.getDriverProfile(this.userData.user_id).pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      if (result.response_code == 200) {
        this.driverProfile = result.data
        this.licenseDetail = result.data.licenseDetail
        this.licenseFormGroup.patchValue(result.data.licenseDetail)
        console.log('driver-profile: ', this.driverProfile);
        if (successStatus) {
          window.alertSuccess('บันทึกข้อมูลสำเร็จแล้ว')
          this._changeDetectorRef.markForCheck()
        } else {
          window.alertClose()
          this._changeDetectorRef.markForCheck()
        }
        // if (this.driverProfile.licenseDetail) {
        //   // this._filesManagementService.getSizeOfFile(this.driverProfile.licenseDetail.license_download)
        //   //   .pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
        //   //     if (result.status == '200') {
        //   //       console.log(result);
        //   //       this.licenseImgObj = {
        //   //         fileSize: this._filesManagementService.convertSizeToMb(result.body.size),
        //   //       }
        //   //       if (successStatus) {
        //   //         window.alertSuccess('บันทึกข้อมูลสำเร็จแล้ว')
        //   //         this._changeDetectorRef.markForCheck()
        //   //       } else {
        //   //         window.alertClose()
        //   //         this._changeDetectorRef.markForCheck()
        //   //       }
        //   //     } else {
        //   //       window.alertFail()
        //   //       this._changeDetectorRef.markForCheck()
        //   //     }
        //   //   }, (e) => {
        //   //     window.alertFail('ไฟล์ภาพไม่ตรงกับ api ที่ set ไว้ \n(แนะนำให้ลอง delete license แล้ว upload ใหม่)');
        //   //     this._changeDetectorRef.markForCheck();
        //   //   })
        // } else {
        //   window.alertClose()
        //   this._changeDetectorRef.markForCheck()
        // }
      } else {
        window.alertFail(result.response_desc)
        this._changeDetectorRef.markForCheck()
      }
    }, (e) => {
      window.alertFail(e)
      this._changeDetectorRef.markForCheck()
    })
  }

  // openAutocomplete() {
  //   if (this.autocomplete) {
  //     this.autocomplete.openPanel();
  //   }
  // }

  // ใช้ prevent() โดยจุดมุ่งหมายคือ "ไม่สามารถพิมพ์หรือกดปุ่มทำอะไรได้" แต่ใช้งาน auto-complete ได้
  vTypeKeyDown(event: any) {
    event.preventDefault()
  }

  //validator only input number
  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  changeFile(event: any, category: string) {
    let checkFile = this._filesManagementService.checkFile(event)
    if (checkFile) {
      // file-manage
      switch (category) {
        case 'license':
          const [fileLicense] = event.target.files;
          const readerLicense = new FileReader();
          if (fileLicense) {
            readerLicense.readAsDataURL(fileLicense);
            readerLicense.onload = () => {
              this.licensePic = readerLicense.result as string;
              this._changeDetectorRef.markForCheck();
            };
            if (this.data_license.length = 0) {
              this.data_license.push({
                file: event.target.files[0],
                fileName: event.target.files[0].name,
                fileSize: this._filesManagementService.convertSizeToMb(event.target.files[0].size), //MB
              });
            } else {
              this.data_license.splice(0, 1, {
                file: event.target.files[0],
                fileName: event.target.files[0].name,
                fileSize: this._filesManagementService.convertSizeToMb(event.target.files[0].size), //MB
              });
            }
            console.log('license-img-obj', this.data_license);
            this.licenseImgObj = this.data_license[0]
            this.licenseFormGroup.get('license_size')?.setValue(this.licenseImgObj.fileSize)
            console.log('license-form: ', this.licenseFormGroup.getRawValue());
            this.checkValidateFormGroup(this.licenseFormGroup)
          }
          break;

        case 'vehicle':
          const [fileVehicle] = event.target.files;
          const readerVehicle = new FileReader();
          if (fileVehicle) {
            readerVehicle.readAsDataURL(fileVehicle);
            readerVehicle.onload = () => {
              this.vehiclePic = readerVehicle.result as string;
              this._changeDetectorRef.markForCheck();
            };

            if (this.data_vehicle.length = 0) {
              this.data_vehicle.push({
                file: event.target.files[0],
                fileName: event.target.files[0].name,
                fileSize: this._filesManagementService.convertSizeToMb(event.target.files[0].size), //MB
              });
            } else {
              this.data_vehicle.splice(0, 1, {
                file: event.target.files[0],
                fileName: event.target.files[0].name,
                fileSize: this._filesManagementService.convertSizeToMb(event.target.files[0].size), //MB
              });
            }
            console.log('vehicle-img-obj', this.data_vehicle);
            this.vehicleImgObj = this.data_vehicle[0]
            this.checkValidateFormGroup(this.vehicleFormGroup)
          }
          break;
      }
    } else {
      switch (category) {
        case 'license':
          this.inputLicense.nativeElement.value = null;
          break;
        case 'vehicle':
          this.inputVehicle.nativeElement.value = null;
          break;
      }
    }


  }

  confirmDriverSetting() {
    console.clear()
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      width: '100%',
      data: !this.addVehicleCheck ? 'driver_register' : 'add_vehicle'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        window.alertLoading()
        if (!this.addVehicleCheck) {
          this.uploadLicense()
        } else {
          console.log('เพิ่มยานพาหนะ');
          this.uploadVehicle(this.driverProfile?.licenseDetail.license_id)
        }
      }

    });
  }

  uploadLicense() {
    // license-upload
    const licenseData = this.licenseFormGroup.getRawValue()
    console.log('license: ', licenseData);
    this._driverRegisterService.uploadLicense(licenseData).subscribe((result: any) => {
      console.log('license-result: ', result);
      if (result.response_code == 200) {
        this._changeDetectorRef.markForCheck()
        let licenseId = result.data.license_id
        let licenseParam = { id: licenseId, category: 'license', size: this.licenseFormGroup.get('license_size')?.value }
        let licenseFormData = this._filesManagementService.onUploadAttachment(this.data_license, licenseParam)
        this._filesManagementService.attachFile(licenseFormData).subscribe((result: any) => {
          console.log('result: ', result);
          this.driverProfile.licenseDetail = result.data
          console.log('🪪', this.driverProfile);
          if (result.response_code == 200) {
            this._changeDetectorRef.markForCheck()
            this.uploadVehicle(licenseId)
          } else {
            window.alertFail(result.response_desc)
            this._changeDetectorRef.markForCheck();
          }
        })
      } else {
        window.alertFail(result.response_desc)
        this._changeDetectorRef.markForCheck();
      }
    })

  }

  uploadVehicle(licenseId: any) {
    // vehicle-upload
    const vehicleData = this.vehicleFormGroup.getRawValue()
    vehicleData.license_id = licenseId
    console.log('vehicle: ', vehicleData);
    this._driverRegisterService.uploadVehicle(vehicleData).subscribe((result: any) => {
      console.log('vehicle-result: ', result);
      if (result.response_code == 200) {
        this._changeDetectorRef.markForCheck()
        const vehicleId = result.data.vehicle_id
        let vehicleParam = {
          id: vehicleId,
          category: this._filesManagementService.storeCategory.vehicle,
          size: this.vehicleImgObj?.fileSize ? (this.vehicleImgObj?.fileSize).toString() : '0'
        }
        let vehicleFormData = this._filesManagementService.onUploadAttachment(this.data_vehicle, vehicleParam)
        this._filesManagementService.attachFile(vehicleFormData).subscribe((result: any) => {
          console.log('result: ', result);
          if (result.response_code == 200) {
            this.addVehicleCheck = false
            this.clearLicenseForms()
            this.clearVehicleForms()
            this.getDriverProfile(true)
          } else {
            window.alertFail(result.response_desc)
            this._changeDetectorRef.markForCheck();
          }
        })
      } else {
        if (!this.addVehicleCheck) {
          // delete all-license data relate to this-user
          this.deleteDriverProfile(result.response_desc)
        } else {
          window.alertFail(result.response_desc)
          this._changeDetectorRef.markForCheck();
        }
      }
    })
  }

  goBack(path: string) {
    if (this.addVehicleCheck) {
      this.clearVehicleForms()
      window.alertLoading()
      setTimeout(() => {
        window.alertClose()
        this._changeDetectorRef.markForCheck()
      }, 500);
    } else {
      this.appComponent.go(path)
    }
  }

  clearVehicleForms() {
    this.data_vehicle = []
    this.vehicleImgObj = null
    this.vehiclePic = ''
    this.addVehicleCheck = false
    this.disbleBtn = true
    this.vehicleFormGroup.reset()
  }

  clearLicenseForms() {
    this.data_license = []
    this.licenseImgObj = null
    this.licensePic = ''
    this.disbleBtn = true
    this.licenseFormGroup.reset()
    this.licenseFormGroup.get('user_id')?.setValue(this.userData.user_id)
  }

  deleteVehicle(vehicle: any) {
    console.clear()
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      width: '100%',
      data: 'delete_vehicle'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        window.alertLoading()
        console.log('vehicle: ', vehicle);
        vehicle.user_id = this.userData.user_id
        this._driverRegisterService.deleteVehicle(vehicle).subscribe((result: any) => {
          console.log('result: ', result);
          if (result.response_code == 200) {
            this.getDriverProfile()
          } else {
            window.alertFail(result.response_desc)
            this._changeDetectorRef.markForCheck();
          }
        },
          (e) => {
            window.alertFail(e.error.response_desc);
            this._changeDetectorRef.markForCheck();
          })
      }

    });
  }

  onDeleteDriverProfile(dialogType: string) {
    // cancel_register
    // delete_license
    // denied_approval
    console.clear()
    let dialogRef;
    if (dialogType != 'denied_approval') {
      dialogRef = this.dialog.open(ConfirmDialogComponent, {
        autoFocus: false,
        width: '100%',
        data: dialogType
      });
    } else {
      let deniedDetail = this.driverProfile.licenseDetail.denied_detail
      dialogRef = this.dialog.open(ConfirmDialogComponent, {
        autoFocus: false,
        width: '100%',
        data: { data: dialogType, denied_detail: deniedDetail }
      });
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        window.alertLoading()
        this.deleteDriverProfile()
      }
    });
  }

  deleteDriverProfile(isEmergencyDelete: string = '') {
    this._filesManagementService.deleteDriverProfile(this.driverProfile).subscribe((result: any) => {
      console.log('result: ', result);
      if (result.response_code == 200 && !isEmergencyDelete) {
        this.clearLicenseForms()
        this.getDriverProfile()
      } else {
        this.driverProfile.licenseDetail = null
        window.alertFail(isEmergencyDelete ? isEmergencyDelete : result.response_desc)
        this._changeDetectorRef.markForCheck();
      }
    },
      (e) => {
        window.alertFail(e.error.response_desc);
        this._changeDetectorRef.markForCheck();
      })
  }

}

// @Pipe({
//   name: 'customDateFormat'
// })
// export class CustomDateFormatPipe implements PipeTransform {
//   transform(timestamp: string): string {
//     const date = new Date(timestamp);

//     const day = date.getDate();
//     const month = date.getMonth() + 1; // Months are zero-based, so add 1
//     const year = date.getFullYear();

//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const ampm = hours >= 12 ? 'PM' : 'AM';

//     // Format the date and time components
//     const formattedDate = `${day}/${month}/${year}`;
//     const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

//     // Combine date and time with the desired format
//     return `${formattedDate} : ${formattedTime}`;
//   }
// }
