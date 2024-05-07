import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountProfileService } from '../account-profile.service';
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


declare var window: any;

@Component({
  selector: 'account-profile-detail',
  templateUrl: './account-profile-detail.component.html',
})
export class AccountProfileDetailComponent implements OnInit {
  demoImg = imgAsset.fatjoeDemo

  tripCountMessage = "จำนวนการเดินทางทั้งหมดของผู้ใช้"
  verifiedUserMessage = "ได้รับการยืนยันการเป็นผู้ขับขี่แล้ว"

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  filteredOtherContact: Observable<any[]> = new Observable<any[]>;


  disableBtn: boolean = true
  disableContactInfo: boolean = true
  accountPage: any
  userData: any
  accountFormGroup: FormGroup
  accountOriginFormGroup: FormGroup

  data_cover: any = [];
  profilePic: string = '';
  profileImgObj: any
  originProfilePic: string = '';
  @ViewChild('profile') inputCover: any;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   * @param {UserProfileListService} _userProfileListService
   */
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _accountProfileService: AccountProfileService,
    private _changeDetectorRef: ChangeDetectorRef,
    private cookieService: CookieService,
    private dialog: MatDialog,
    private _filesManagementService: FilesManagementService,
    private _appComponent: AppComponent,
    private tabs: MatTabsModule,
    private tooltips: MatTooltipModule,
    private elementRef: ElementRef,
  ) {
    this.accountFormGroup = this._formBuilder.group({
      user_id: [],
      // firstname: ['Jane'],
      // lastname: ['Doe'],
      fullname: [''],
      email: ['lorem@mail.kmutt.ac.th'],
      faculty_name: ['test'],
      branch_name: [''],
      tel: [null],
      role_id: [],
      other_contact: [],
      contact_info: [],
    });
    this.accountOriginFormGroup = this._formBuilder.group({
      user_id: [],
      // firstname: ['Jane'],
      // lastname: ['Doe'],
      fullname: [''],
      email: ['lorem@mail.kmutt.ac.th'],
      faculty_name: ['test'],
      branch_name: [''],
      tel: [null],
      role_id: [],
      other_contact: [],
      contact_info: [],
    });

    this.accountFormGroup.get('other_contact')?.valueChanges.subscribe(selectedFaculty => {
      this.accountFormGroup.get('contact_info')?.setValue(''); // Clear previous branch selection
      this.accountFormGroup.get('contact_info')?.disable(); // disable branch when fac changes
      // console.log(this.accountFormGroup.get('other_contact')?.value);
      // console.log(this.otherContact.includes(this.accountFormGroup.get('other_contact')?.value));

      // this.accountFormGroup.get('branch_name')?.enable(); // check if object = เป็น array ที่พบค่า faculty
      if (this.otherContact.includes(this.accountFormGroup.get('other_contact')?.value)) {
        this.accountFormGroup.get('contact_info')?.enable()
        this.disableContactInfo = false
      } else {
        this.accountFormGroup.get('contact_info')?.disable()
        this.disableContactInfo = true
      }
    });

    this.accountFormGroup.valueChanges.subscribe(changes => {
      // Check if only one control has a null or empty value
      const controlsWithNullOrEmpty = Object.keys(this.accountFormGroup.controls).filter(key => {
        const control = this.accountFormGroup.get(key);
        return control?.value === null || control?.value === '';
      });
      // console.log('check: ', controlsWithNullOrEmpty.length);
      if (controlsWithNullOrEmpty.length == 0
        && (JSON.stringify(this.accountOriginFormGroup.getRawValue()) == JSON.stringify(this.accountFormGroup.getRawValue()))
      ) {
        console.log('disble');
        this.disableBtn = true
        return;
      }
      else if (controlsWithNullOrEmpty.length > 0) {
        // console.log('disble');
        this.disableBtn = true
        return;
      }
      else if (
        controlsWithNullOrEmpty.length == 0
        && (JSON.stringify(this.accountOriginFormGroup.getRawValue()) != JSON.stringify(this.accountFormGroup.getRawValue()))
      ) {
        // console.log('enable');
        this.disableBtn = false
        return;
      }
    });
  }


  facultyList: any[] = []
  faculties: any[] = [];
  branches: any[] = [];
  otherContact: any[] = ['Line ID', 'Facebook', 'Instragram'];


  ngOnInit() {
    console.clear()
    this.accountPage = this.cookieService.get('url');
    const userFromStoreData = this.cookieService.get('user');
    this.userData = JSON.parse(userFromStoreData);
    console.log('url: ', this.accountPage);
    console.log('check-user-cookie: ', this.cookieService.check('user'));
    if (this.accountPage == '/account/detail' && this.cookieService.check('user')) {
      this.getUserById()
    }

    // filter-otherContact
    this.filteredOtherContact = this.accountFormGroup.get('other_contact')?.valueChanges.pipe(
      startWith(''),
      map(value => this._otherContactFilter(value))
    ) as Observable<any[]>;
  }

  getUserById() {
    this._accountProfileService.getUserById(this.userData.user_id).pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      if (result.response_code == 200) {
        console.log(result);
        this._appComponent.setUserCookie(result.data)
        this.userData = result.data
        this.profilePic = result.data.download_url
        this.originProfilePic = result.data.download_url
        console.log(this.profilePic);
        this.accountOriginFormGroup.patchValue(result.data)
        this.accountFormGroup.patchValue(result.data)
        // console.log('❤️check: ', JSON.stringify(this.accountOriginFormGroup.getRawValue()) == JSON.stringify(this.accountFormGroup.getRawValue()));
        window.alertClose()
        this._changeDetectorRef.markForCheck()
        // if (result.data.download_url) {
        //   // เพื่อ delay สำหรับ load ภาพ
        //   this._filesManagementService.getSizeOfFile(result.data.download_url)
        //     .pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
        //       if (result.status == '200') {
        //         window.alertClose()
        //         this._changeDetectorRef.markForCheck()
        //       }
        //     })
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


  private _otherContactFilter(value: any): any[] {
    const filterValue = value.toLowerCase()
    return this.otherContact.filter(oContact => oContact.toLowerCase().includes(filterValue));
  }
  displayOtherContactFilter(oContact: any): string {
    return oContact;
  }

  onInputPhone(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/\D/g, ''); // Remove non-numeric characters
    this.accountFormGroup.get('tel')?.setValue(event.target.value);
    let tel = this.accountFormGroup.get('tel')?.value
    // if ((tel.length == 0 || tel.length == 10)) {
    //   this.disableBtn = false
    // } else { this.disableBtn = true }
  }

  editProfile(event: any) {
    let checkFile = this._filesManagementService.checkFile(event, true)
    if (checkFile) {
      this.disableBtn = false
      console.log('image-prop: ', event);
      const reader = new FileReader();

      const [file] = event.target.files;
      if (file) { // กัน error หากเปิด input-file กดไฟล์ที่ต้องการ แต่ cancel+ปิด input window
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.profilePic = reader.result as string;
          // Mark for check
          this._changeDetectorRef.markForCheck();
        };

        if (this.data_cover.length = 0) {
          this.data_cover.push({
            file: event.target.files[0],
            filename: event.target.files[0].name,
            fileSize: this._filesManagementService.convertSizeToMb(event.target.files[0].size), //MB
          });
        } else {
          this.data_cover.splice(0, 1, {
            file: event.target.files[0],
            filename: event.target.files[0].name,
            fileSize: this._filesManagementService.convertSizeToMb(event.target.files[0].size), //MB
          });
        }

        this.profileImgObj = this.data_cover[0]
        console.log((this.profileImgObj?.fileSize).toString());
        console.log('final-profile-data: ', this.data_cover);
      }
    } else {
      this.inputCover.nativeElement.value = null;
    }


  }

  getExtension(filename: any) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }

  checkImage(filename: any) {
    var ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'png':
        //etc
        return true;
    }
    return false;
  }

  onUploadAttachment(data: any[]) {
    console.log(data);

    if (data.length > 0) {
      let profileParam = {
        id: this.accountFormGroup.get('user_id')?.value,
        category: this._filesManagementService.storeCategory.user,
        size: this.profileImgObj?.fileSize ? (this.profileImgObj?.fileSize).toString() : '0'
      }

      let profileFormData = this._filesManagementService.onUploadAttachment(this.data_cover, profileParam)
      try {
        this._filesManagementService.attachFile(profileFormData).subscribe((result: any) => {
          console.log(result);
          if (result.response_code == 200) {
            this._changeDetectorRef.markForCheck()
            this.updateUserAccount()
          } else {
            window.alertFail(result.response_desc)
            this._changeDetectorRef.markForCheck();
          }

        })

        // let result: any
        // if (data.length > 1) {
        //   if ((data.length - 1) == index) {
        //     arrayData = arrayData + result.data.attachment_path

        //   } else {
        //     arrayData = arrayData + result.data.attachment_path + ","

        //   }
        //   this.accountFormGroup.get('profile_img_path')?.setValue(arrayData);

        // } else {
        //   this.accountFormGroup.get('profile_img_path')?.setValue(result.data.attachment_path);

        // }

      } catch (error) {
        window.alertFail(error);
      }
    } else {
      this.updateUserAccount()
    }
  }


  onSave() {
    console.clear()
    console.log(this.accountFormGroup.getRawValue());
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      width: '100%',
      data: 'edit_account'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('confirm-result: ', result);
      if (result == true) {
        window.alertLoading()
        this.onUploadAttachment(this.data_cover);
        // console.log('ยืนยันการบันทึก');

      }

    });

  }

  updateUserAccount() {
    this.accountFormGroup.get('tel')?.setValue(this.accountFormGroup.get('tel')?.value == '' ? null : this.accountFormGroup.get('tel')?.value)
    let data = this.accountFormGroup.getRawValue()
    this._accountProfileService.updateAccount(data).subscribe((result: any) => {
      console.log('กำลังบันทึก user');
      if (result.response_code == 200) {
        console.log(result);
        this._appComponent.setUserCookie(result.data)
        // this.cookieService.set('user', JSON.stringify(result.data), undefined, '/');
        this._appComponent.detectUpdateUserCookie()
        // console.log('user',JSON.stringify(result.data));
        this.accountOriginFormGroup.patchValue(result.data)
        this.accountFormGroup.patchValue(result.data)
        this.disableBtn = true
        window.alertClose()
        this._changeDetectorRef.markForCheck()
      } else {
        window.alertFail(result.response_desc)
        this._changeDetectorRef.markForCheck();
      }
    })
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      width: '100%',
      data: 'logout'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('logout-result?: ', result);
      if (result == true) {
        this._changeDetectorRef.markForCheck()
        console.log('ทำการ logout');
        window.alertLoading()

        localStorage.removeItem('user')
        this.cookieService.deleteAll('/')
        setTimeout(() => {
          window.alertClose()
          this._changeDetectorRef.markForCheck()
          // this.cookieService.delete('user')
          this._router.navigate(['/sign-in'])
        }, 500);
      }
    });
  }

  go(url: string) {
    this._appComponent.go(url)
  }

}

