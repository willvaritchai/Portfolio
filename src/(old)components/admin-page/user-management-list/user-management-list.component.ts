import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { takeUntil, Subject, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/components/confirm-dialog/confirm-dialog.component';
import { AppComponent } from 'src/app/app.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';
import { Location } from '@angular/common';


declare var window: any;

@Component({
  selector: 'user-management-list',
  templateUrl: './user-management-list.component.html',
  styleUrls: ['./user-management-list.component.scss'],

})
export class UserManagementListComponent implements OnInit {
  userColumn: string[] = ['user_img', 'user_acc', 'fac_branch', 'contact', 'role', 'manage'];

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  filteredOtherContact: Observable<any[]> = new Observable<any[]>;

  countAppStat: any

  // Example data
  userList: any = [
    {
      fullname: 'PATTARAPON MAKHIRUN',
      email: 'pattarapon.it@mail.kmutt.ac.th',
      faculty: 'คณะเทคโนโลยีสารสนเทศ',
      branch: 'สาขาเทคโนโลยีสารสนเทศ',
      tel: '061-123-1234',
      other_contact: 'Line ID',
      contact_info: '@Lorem-Ipsum',
      role_name_th: 'ผู้โดยสาร'
    },
    {
      fullname: 'PATTARAPON MAKHIRUN',
      email: 'pattarapon.it@mail.kmutt.ac.th',
      faculty: 'คณะเทคโนโลยีสารสนเทศ',
      branch: 'สาขาเทคโนโลยีสารสนเทศ',
      tel: '061-123-1234',
      other_contact: 'Line ID',
      contact_info: '@Lorem-Ipsum',
      role_name_th: 'ผู้ขับขี่'
    },
    {
      fullname: 'PATTARAPON MAKHIRUN',
      email: 'pattarapon.it@mail.kmutt.ac.th',
      faculty: 'คณะเทคโนโลยีสารสนเทศ',
      branch: 'สาขาเทคโนโลยีสารสนเทศ',
      tel: '061-123-1234',
      other_contact: 'Line ID',
      contact_info: '@Lorem-Ipsum',
      role_name_th: 'ผู้ดูแลระบบ'
    },
    {
      fullname: 'PATTARAPON MAKHIRUN',
      email: 'pattarapon.it@mail.kmutt.ac.th',
      faculty: 'คณะเทคโนโลยีสารสนเทศ',
      branch: 'สาขาเทคโนโลยีสารสนเทศ',
      tel: '061-123-1234',
      other_contact: 'Line ID',
      contact_info: '@Lorem-Ipsum',
      role_name_th: 'ผู้โดยสาร'
    },
    {
      fullname: 'PATTARAPON MAKHIRUN',
      email: 'pattarapon.it@mail.kmutt.ac.th',
      faculty: 'คณะเทคโนโลยีสารสนเทศ',
      branch: 'สาขาเทคโนโลยีสารสนเทศ',
      tel: '061-123-1234',
      other_contact: 'Line ID',
      contact_info: '@Lorem-Ipsum',
      role_name_th: 'ผู้ขับขี่'
    },
    {
      fullname: 'PATTARAPON MAKHIRUN',
      email: 'pattarapon.it@mail.kmutt.ac.th',
      faculty: 'คณะเทคโนโลยีสารสนเทศ',
      branch: 'สาขาเทคโนโลยีสารสนเทศ',
      tel: '061-123-1234',
      other_contact: 'Line ID',
      contact_info: '@Lorem-Ipsum',
      role_name_th: 'ผู้ดูแลระบบ'
    },
    {
      fullname: 'PATTARAPON MAKHIRUN',
      email: 'pattarapon.it@mail.kmutt.ac.th',
      faculty: 'คณะเทคโนโลยีสารสนเทศ',
      branch: 'สาขาเทคโนโลยีสารสนเทศ',
      tel: '061-123-1234',
      other_contact: 'Line ID',
      contact_info: '@Lorem-Ipsum',
      role_name_th: 'ผู้โดยสาร'
    },
    {
      fullname: 'PATTARAPON MAKHIRUN',
      email: 'pattarapon.it@mail.kmutt.ac.th',
      faculty: 'คณะเทคโนโลยีสารสนเทศ',
      branch: 'สาขาเทคโนโลยีสารสนเทศ',
      tel: '061-123-1234',
      other_contact: 'Line ID',
      contact_info: '@Lorem-Ipsum',
      role_name_th: 'ผู้ขับขี่'
    },
    {
      fullname: 'PATTARAPON MAKHIRUN',
      email: 'pattarapon.it@mail.kmutt.ac.th',
      faculty: 'คณะเทคโนโลยีสารสนเทศ',
      branch: 'สาขาเทคโนโลยีสารสนเทศ',
      tel: '061-123-1234',
      other_contact: 'Line ID',
      contact_info: '@Lorem-Ipsum',
      role_name_th: 'ผู้ดูแลระบบ'
    },
  ];

  disableBtn: boolean = true
  disableContactInfo: boolean = true
  accountPage: any
  userData: any

  search: any = ''
  isLoading: boolean = false

  userCookie: any
  checkAuthorize: boolean = false
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
    private _changeDetectorRef: ChangeDetectorRef,
    private cookieService: CookieService,
    private dialog: MatDialog,
    private appComponent: AppComponent,
    private elementRef: ElementRef,
    private checkBox: MatCheckboxModule,
    private _getExtraDataService: GetExtraDataService,
    private location: Location
  ) { }


  facultyList: any[] = []
  faculties: any[] = [];
  branches: any[] = [];

  // check approval status
  pending_status: any
  approve_status: any
  denied_status: any


  ngOnInit() {
    // window.alertClose()
    // this._changeDetectorRef.markForCheck()
    // จัดการ การแสดงพวก nav และ icon
    this.appComponent.detectShowNav(false)
    // set body-bgColor
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#F4F4F6';

    this.userCookie = this._getExtraDataService.getUserFromCookie()
    let param = { encrypt_id: this.userCookie.encrypt_id }
    this.getAllUser(param)

    this._adminService.userListData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      console.log(result);
      this.userList = result?.data
    }, (e) => {
    })

    this._adminService.appStatListData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      this.countAppStat = result.data
    })
  }


  checkBoxAppStatus(status: string) {
    switch (status) {
      case 'pending':
        this.pending_status ? this.pending_status = '0' : this.pending_status = null
        break;
      case 'approve':
        this.approve_status ? this.approve_status = '1' : this.approve_status = null
        break;
      case 'denied':
        this.denied_status ? this.denied_status = '2' : this.denied_status = null
        break;
    }

    console.log('pending: ', this.pending_status);
    console.log('approve: ', this.approve_status);
    console.log('denied: ', this.denied_status);
    console.log('----------------------------');
    this.searching()
  }

  deleteUser() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      width: '30%',
      data: 'delete_account'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('confirm-result: ', result);
      if (result == true) {
        console.log('ยืนยันการลบ');
      }

    });
  }

  userDetail(user_id: any) {
    console.log(user_id);

    this._router.navigate(['/user-management/detail', user_id])
  }


  onKeyUp(event: any) {
    // console.log(event);
    if (event.keyCode == 13) {
      this.searching()
    }
  }

  searching() {
    this.isLoading = true
    this.userList = []
    // console.log('search: ', this.search);
    const param: any = { encrypt_id: this.userCookie.encrypt_id, search: this.search };
    this.pending_status ? param.pending_status = parseInt(this.pending_status) : null
    this.approve_status ? param.approve_status = parseInt(this.approve_status) : null
    this.denied_status ? param.denied_status = parseInt(this.denied_status) : null
    console.log(param);
    this.getAllUser(param)
  }


  getAllUser(param: any) {
    this._adminService.getUserList(param).pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      if (result.response_code == 200) {
        window.alertClose()
        this.checkAuthorize = true
        this.isLoading = false
        this._changeDetectorRef.markForCheck()
      } else {
        window.alertFail(result.response_desc)
      }
    }, (e) => {
      window.alertFail(e.error.response_desc).then(() => {
        this.location.back()
      })
      this._changeDetectorRef.markForCheck()
    })
  }



}

