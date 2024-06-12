import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { takeUntil, Subject, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/components/dialogs/confirm-dialog.component';
import { AppComponent } from 'src/app/app.component';
import { MatTableDataSource } from '@angular/material/table';
import { AccountProfileService } from 'src/components/account-profile/account-profile.service';
import { C } from '@fullcalendar/core/internal-common';
import { DriverRegisterService } from 'src/components/driver-register/driver-register.service';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';
import { Location } from '@angular/common';

declare var window: any;

@Component({
  selector: 'user-management-detail',
  templateUrl: './user-management-detail.component.html',
  styleUrls: ['./user-management-detail.component.scss'],

})
export class UserManagementDetailComponent implements OnInit {
  userDetailManFormGroup: FormGroup
  faculties: any[] = [];
  branches: any[] = [];
  driverProfile: any
  licenseDetailList: any[] = []
  licenseCol: string[] = ['license_fn', 'license_ln'];
  vehicleCol: string[] = ['brand', 'model', 'vehicle_type', 'vehicle_color', 'license_plate', 'seats'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  filteredFaculties: Observable<any[]> = new Observable<any[]>;
  filteredBranches: Observable<any[]> = new Observable<any[]>;

  editMode: boolean = false
  disableBranch: boolean = true
  setBranchEmpty: boolean = false
  disableBtn: boolean = true
  disableContactInfo: boolean = true
  checkAuthorize: boolean = false
  checkApproval: boolean = false
  accountPage: any
  userDetail: any
  userDetailId: any
  userCookie: any


  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   * @param {UserProfileListService} _userProfileListService
   */
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _adminService: AdminService,
    private _accountProfileService: AccountProfileService,
    private _driverRegisterService: DriverRegisterService,
    private _changeDetectorRef: ChangeDetectorRef,
    private cookieService: CookieService,
    private dialog: MatDialog,
    private appComponent: AppComponent,
    private elementRef: ElementRef,
    private _getExtraDataService: GetExtraDataService,
    private _route: ActivatedRoute,
    private location: Location,

  ) {
    this.userDetailManFormGroup = this._formBuilder.group({
      faculty_name: ['hello'],
      branch_id: [null],
      branch_name: ['']
    });


    this.userDetailManFormGroup.get('faculty_name')?.valueChanges.subscribe(selectedFaculty => {
      let facultyName: any
      let branchName: any
      facultyName = typeof this.userDetailManFormGroup.get('faculty_name')?.value == 'object' ? this.userDetailManFormGroup.get('faculty_name')?.value.faculty_name : this.userDetailManFormGroup.get('faculty_name')?.value
      branchName = typeof this.userDetailManFormGroup.get('branch_name')?.value == 'object' ? this.userDetailManFormGroup.get('branch_name')?.value.branch_name : this.userDetailManFormGroup.get('branch_name')?.value
      console.log(facultyName);
      console.log('fac-type: ', typeof facultyName == 'object');

      console.log(branchName);
      if (this.setBranchEmpty) {
        this.userDetailManFormGroup.get('branch_name')?.setValue('');
      } else {
        this.userDetailManFormGroup.get('branch_name')?.setValue(branchName);
      }
      this.userDetailManFormGroup.get('branch_name')?.disable(); // disable branch when fac changes
      console.log(this.userDetailManFormGroup.get('faculty_name')?.value);
      console.log(this.userDetailManFormGroup.get('branch_name')?.value);
      // console.log(this.faculties.filter(f => f.faculty_name == typeof facultyName == 'object'? '':''));
      console.log(this.branches.filter(b => b.branch_name === branchName).length > 0);


      this.setBranchEmpty = true
      if (this.faculties.filter(f => f.faculty_name == facultyName).length > 0) {
        this.userDetailManFormGroup.get('branch_name')?.enable()
        this.disableBranch = false
      } else {
        this.userDetailManFormGroup.get('branch_name')?.disable()
        this.disableBranch = true
      }

    });

  }





  ngOnInit() {
    // window.alertClose()
    // this._changeDetectorRef.markForCheck()
    // จัดการ การแสดงพวก nav และ icon
    this.appComponent.detectShowNav(false)
    // set body-bgColor
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#F4F4F6';

    this.userCookie = this._getExtraDataService.getUserFromCookie()
    this.userDetailId = this._route.snapshot.params['user_id'];

    this.getUserDetail()

    this._accountProfileService.facultyListData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      console.log('faculties: ', result);
      this.faculties = result.data
    })

    this._accountProfileService.branchListData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      console.log('branches: ', result);
      this.branches = result.data
    })

    // this._adminService.userData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
    // })







    // filterFac
    this.filteredFaculties = this.userDetailManFormGroup.get('faculty_name')?.valueChanges.pipe(
      startWith(this.userDetailManFormGroup.get('faculty_name')?.value),
      map(value => this._facFilter(value))
    ) as Observable<any[]>;

    // filterBranch
    this.filteredBranches = this.userDetailManFormGroup.get('branch_name')?.valueChanges.pipe(
      startWith(this.userDetailManFormGroup.get('branch_name')?.value),
      map(value => this._branchFilter(value))
    ) as Observable<any[]>;


  }

  // filter-func
  private _facFilter(value: any): any[] {
    console.log('fac-filter-values: ', value)
    const filterValue = typeof value === 'object' ? value.faculty_name : value.toLowerCase()
    console.log('fac-filter-val: ', filterValue);
    return this.faculties.filter(faculty => faculty.faculty_name.toLowerCase().includes(filterValue));
  }
  displayFaculty(faculty: any): string {
    console.log(faculty);
    console.log(faculty ? faculty.faculty_name : faculty);
    return typeof faculty === 'object' ? faculty.faculty_name : faculty;
  }

  private _branchFilter(value: any): any[] {
    console.log('branch-val: ', value);
    let selectedFacultyId: any
    if (typeof this.userDetailManFormGroup.get('faculty_name')?.value == 'string') {
      selectedFacultyId = this.faculties.filter(b => b.faculty_name === this.userDetailManFormGroup.get('faculty_name')?.value)[0]?.faculty_id
    } else {
      selectedFacultyId = this.userDetailManFormGroup.get('faculty_name')?.value?.faculty_id;
    }

    console.log('selected-fac-id: ', selectedFacultyId);

    const filterValue = typeof value === 'object' ? value.branch_name : value.toLowerCase()
    console.log('branch-filter-values: ', filterValue);

    let filteredBranches = this.branches;
    if (selectedFacultyId) {
      filteredBranches = this.branches.filter(branch => branch.faculty_id === selectedFacultyId);
    }
    if (typeof this.userDetailManFormGroup.get('branch_name')?.value === 'object' && this.userDetailManFormGroup.get('branch_name')?.value != null) {
      console.log('faculty-obj: ', this.userDetailManFormGroup.get('faculty_name')?.value);
      console.log('branch-obj: ', this.userDetailManFormGroup.get('branch_name')?.value);

    }
    return filteredBranches.filter(branch => branch.branch_name.toLowerCase().includes(filterValue));
  }
  displayBranch(branch: any): string {
    console.log('branch: ', branch);
    return typeof branch === 'object' ? branch.branch_name : branch;
  }

  // ---------------------------------

  toggleDropdown() {

  }

  deleteUser(userId: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      width: '30%',
      data: 'delete_account'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('confirm-result: ', result);
      if (result == true) {
        window.alertLoading()
        console.log('ยืนยันการลบ: ', userId);
        this._adminService.deleteAccount(userId).pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
          console.log(result);
          if (result.response_desc === "success") {
            window.alertSuccess('ลบบัญชีผู้ใช้สำเร็จ').then(() => {
              this._router.navigate(['/user-management/list']);
            })
          } else {
            window.alertFail(result.response_desc);
          }
        })
      }

    });
  }

  edit(action: boolean) {
    this.editMode = action
    console.log(this.userDetail);

  }

  cancelSave() {
    this.editMode = false
    this.userDetailManFormGroup.get('faculty_name')?.setValue(this.userDetail.faculty_name)
    this.userDetailManFormGroup.get('branch_name')?.setValue(this.userDetail.branch_name)
  }


  checkEnableSave() {
    // เช็คหาก branch ไม่ได้เป็น object จะทำการ disable การบันทึก
    return typeof this.userDetailManFormGroup.get('branch_name')?.value == 'object'
  }

  save() {
    console.clear()
    window.alertLoading()
    console.log(this.userDetailManFormGroup.getRawValue());
    let branchId: any
    if (typeof this.userDetailManFormGroup.get('branch_name')?.value == 'object') {
      branchId = this.userDetailManFormGroup.get('branch_name')?.value.branch_id
    } else {
      branchId = this.branches.filter(b => b.branch_name == this.userDetailManFormGroup.get('branch_name')?.value)[0]?.branch_id
    }

    let params = { user_id: this.userDetail.user_id, branch_id: branchId }
    console.log('final-data for save: ', params);
    this._adminService.updateUser(params).pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      console.log(result);
      if (result.response_desc === "success") {
        window.alertClose()
        this.editMode = false
        this.userDetail = result.data
        this._changeDetectorRef.markForCheck()
      } else {
        window.alertFail(result.response_desc);
        this._changeDetectorRef.markForCheck()
      }
    })

  }

  onApproveDialog() {
    console.clear()
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      width: '25%',
      data: 'admin_approval'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('approval???: ', result);
      if (result?.confirm) {
        window.alertLoading()

        let param = {
          approval_status: result.approval_status,
          denied_detail: result.denied_detail,
          license_id: this.driverProfile.licenseDetail.license_id,
          user_id: this.driverProfile.licenseDetail.user_id,
        }
        console.log('🪪param-approval: ', param);
        this._adminService.updateAdminApprovalStatus(param).subscribe((result: any) => {
          console.log('result: ', result);
          if (result.response_code == 200) {
            this.driverProfile.licenseDetail = result.data.licenseDetail
            console.log(this.driverProfile);
            this.checkApproval = true
            this.getUserDetail()
          } else {
            window.alertFail(result.response_desc)
            this._changeDetectorRef.markForCheck();
          }
        })

      } else {
        window.alertClose()
        this._changeDetectorRef.markForCheck();
      }
    });
  }

  getUserDetail() {
    let param = { encrypt_id: this.userCookie.encrypt_id }
    this._adminService.getUserDetail(this.userDetailId, param).subscribe((result: any) => {
      console.log('result: ', result);
      if (result.response_code == 200) {
        this.userDetail = result.data
        if (this.checkApproval) {
          window.alertSuccess('บันทึกข้อมูลสำเร็จ')
          this.checkApproval = false
        } else {
          this.getsDriverProfile()
        }
        console.log(this.userDetail);
        this.userDetailManFormGroup.get('branch_name')?.setValue(this.userDetail.branch_name)
        this.userDetailManFormGroup.get('faculty_name')?.setValue(this.userDetail.faculty_name)
        this._changeDetectorRef.markForCheck()
      } else if (result.response_code == 401 && this.userCookie) {
        window.alertFail(result.response_desc).then(() => {
          this.location.back()
        })
      }
      else {
        window.alertFail(result.response_desc)
        this._changeDetectorRef.markForCheck();
      }
    })

  }

  getsDriverProfile() {
    this._driverRegisterService.getDriverProfile(this.userDetail.user_id).subscribe((result: any) => {
      if (result.response_code == 200) {
        this.driverProfile = result?.data
        console.log('🚕🪪', this.driverProfile);
        if (this.driverProfile?.licenseDetail) {
          this.licenseDetailList.push(this.driverProfile?.licenseDetail)
        }
        console.log('list-of-licenseDetail: ', this.licenseDetailList);
      } else {
        window.alertFail(result.response_desc)
      }
      if (!this.checkApproval) {
        window.alertClose()
        this.checkAuthorize = true
      }
      this._changeDetectorRef.markForCheck()
    }, (e) => {
      window.alertFail(e.error.response_desc)
      this._changeDetectorRef.markForCheck()
    })

  }


}

