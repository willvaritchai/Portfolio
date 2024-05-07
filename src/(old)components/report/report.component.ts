import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { co } from '@fullcalendar/core/internal-common';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/services/FileService.service';
import { SafeUrl } from '@angular/platform-browser';
import { ReportService } from './report.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { atLeastOneCheckboxCheckedValidator } from './checkedValidator';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';
declare var window: any;
@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  cookie: any;
  userId: any;
  reportTo: any;
  driverDetail: any;
  currentRating: number = 0;
  reportUser: any;
  detail: String = '';
  isTrue: boolean = false;
  userName: any;
  userRole: any;

  constructor(
    private reportService: ReportService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private fileService: FileService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private location: Location,
    private getExtraData: GetExtraDataService,
  ) {
    this.reportUser = this._formBuilder.group({
      behavior: false,
      cost: false,
      disturb: false,
      other: false,
    }, { validator: atLeastOneCheckboxCheckedValidator() })
  }

  ngOnInit(): void {
    window.alertLoading();
    let param = { user_id: this.route.snapshot.params['id'] }
    this._changeDetectorRef.markForCheck();
    if (this.cookieService.get('user') != '') {
      this.cookie = JSON.parse(this.cookieService.get('user'));
      this.userId = this.cookie.user_id;
    }
    this.reportService.getUserInfo(param).subscribe(user => {
      window.alertClose();
      this.reportTo = user.data.user_id
      this.userName = user.data.fullname;
      this.userRole = user.data.role_id
      this._changeDetectorRef.markForCheck();
      console.log('reportUserInfo', user);
    })
  }

  report() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      // height: '50%',
      data: 'report'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('confirm-result: ', result);
      if (result == true) {
        window.alertLoading();
        let reportArray = Object.values(this.reportUser.getRawValue());
        reportArray.forEach((report, index) => {
          if (report == true) {
            console.log('report index', index)
            let reportData = {
              report_to: this.reportTo,
              reporter_id: this.userId,
              report_type: index,
              description: this.detail
            }
            this.reportService.reprotUser(reportData).subscribe((res: any) => {
              // if(res.response_desc === 'success'){
              // }
              console.log('report', res);
            })
          }
          if (index === reportArray.length - 1) {
            window.alertClose();
            const dialogRef2 = this.dialog.open(ConfirmDialogComponent, {
              autoFocus: false,
              // height: '40%',
              data: 'done'
            });
            dialogRef2.afterClosed().subscribe(closeResult => {
              if (!this.getExtraData.getDataLocStorage('event-report')) {
                this.router.navigate(['/home']);
              } else {
                this.location.back()
              }
            });
          }

        })

        // const dialogRef2 = this.dialog.open(ConfirmDialogComponent, {
        //   autoFocus: false,
        //   height: '40%',
        //   data: 'done'
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('confirm-result: ', result);
        //   if (result == true) {
        //     this.router.navigate(['/home']);
        //   }
        // });
      }
    });
  }
  triggerEvent(name: string) {
    this.reportUser.get(name).setValue(!this.reportUser.get(name).value)
  }
  back() {
    this.location.back();
  }
}