import { ChangeDetectorRef, Component, OnChanges, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { AccountProfileService } from '../account-profile.service';
import { takeUntil, Subject, Observable } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/components/dialogs/confirm-dialog.component';
import { AppComponent } from 'src/app/app.component';
import { imgAsset } from 'src/environment-variables/img.asset.service';
import { FilesManagementService } from 'src/services/FilesManagementService.service';
import { urlService } from 'src/environment-variables/url.service';
import { Location } from '@angular/common';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';
import { SocialNetworkService } from 'src/components/social-network/social-network.service';
import { MatTabGroup } from '@angular/material/tabs';


declare var window: any;

@Component({
  selector: 'other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.scss'],
})
export class OtherProfileComponent implements OnInit {
  @ViewChild(MatTabGroup) tabGroup?: MatTabGroup;

  demoImg = imgAsset.fatjoeDemo

  tripCountMessage = "จำนวนการเดินทางทั้งหมดของผู้ใช้"
  verifiedUserMessage = "ได้รับการยืนยันการเป็นผู้ขับขี่แล้ว"

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  filteredOtherContact: Observable<any[]> = new Observable<any[]>;


  disableBtn: boolean = true
  disableContactInfo: boolean = true
  accountPage: any
  userData: any
  loc: any
  otherUserData: any
  mutualList: any
  // accountFormGroup: FormGroup


  data_cover: any = [];
  profilePic: string = '';
  profileImgObj: any
  originProfilePic: string = '';
  @ViewChild('profile') inputCover: any;

  /**
   * Constructor
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
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private getExtraData: GetExtraDataService,
    private socialNetworkService: SocialNetworkService,
    private _appComponent: AppComponent
  ) {

  }





  ngOnInit() {
    // console.clear()
    this.userData = this.getExtraData.getUserFromCookie()
    this.loc = this.getExtraData.getLocationState()
    console.log('----------OtherProfileCom-------------');
    console.log('user-cookie: ', this.userData);
    console.log('other-user-id: ', this.loc);

    let param = {
      my_id: this.userData?.user_id,
      branch_name: this.userData?.branch_name,
      encrypt_id: this._activatedRoute.snapshot.params['id']
    }
    console.log('param: ', param);
    this.getOtherProfile(param)



  }

  ngAfterViewInit() {
    console.log('check-tab-group: ', this.tabGroup?.selectedIndex);
  }


  getOtherProfile(param: any) {
    this._accountProfileService.otherProfileData
      .pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
        if (result.response_code == 200) {
          this.otherUserData = result.data
          this.mutualList = this.otherUserData.friendList.filter((f: any) => f.my_id == this.userData.user_id)
          console.log('otherUserData: ', this.otherUserData);
          console.log('mutual: ', this.mutualList);
          window.alertClose()
          this._changeDetectorRef.markForCheck()
        }
      })
  }

  addFriend(data: any, otherFL: any = null) {
    if (!otherFL) {
      this.otherUserData.check_friend = 1
    } else {
      // for friend-list of other
      otherFL.check_friend = 1
    }
    this.socialNetworkService.addUpdateFriendship(data)
      .pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {

      }, (e) => {
        console.log(e);
        window.alertFail(e.error.response_desc).then(() => {
          location.reload()
        })
      })
  }

  cancel(data: any, otherFL: any = null) {
    if (!otherFL) {
      this.otherUserData.check_friend = 0
    } else {
      // for friend-list of other
      otherFL.check_friend = 0

    }
    this.socialNetworkService.cancelFriend(data)
      .pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      }, (e) => {
        console.log(e);
        window.alertFail(e.error.response_desc).then(() => {
          location.reload()
        })
      })
  }

  deleteFriend(data: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      width: '100%',
      data: 'delete_friend'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        window.alertLoading()
        this.socialNetworkService.deleteFriend(data)
          .pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
            if (result.response_code == 200) {
              let param = {
                my_id: this.userData?.user_id,
                branch_name: this.userData?.branch_name,
                user_id: this.loc?.id,
              }
              this.getOtherProfile(param)
            }
          }, (e) => {
            console.log(e);
            window.alertFail(e.error.response_desc).then(() => {
              location.reload()
            })
          })
      }
    })
  }


  go(url: string, id: any) {
    // window.alertLoading()
    if (url != '/report') {
      // หาก user ที่กดดูเป็นของเราเอง จะพาไปหน้า acc-detail ตัวเอง
      if (id == this.userData.encrypt_id) {
        url = '/account/detail'
        this._appComponent.go(url)
      } else {
        this.otherUserData = null
        this.mutualList = null
        this._router.navigate([url, id])
      }
    } else {
      this._router.navigate([url, id])
    }

  }




}

