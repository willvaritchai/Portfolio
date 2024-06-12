import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SocialNetworkService } from '../social-network.service';
import { Subject, filter, takeUntil } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { enumFriendStatus } from 'src/environment-variables/variables.service';
import { AppComponent } from 'src/app/app.component';
import { ConfirmDialogComponent } from 'src/components/dialogs/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
declare var window: any;
@Component({
  selector: 'friends',
  templateUrl: './friends.component.html',
})
export class FriendsComponent implements OnInit {
  socialList: any[] = [
    {
      user_id: 1,
      firstname: 'LOREM',
      lastname: 'IPSUM',
      faculty: 'คณะเทคโนโลยีสารสนเทศ',
      branch: 'สาขาเทคโนโลยีสารสนเทศ',
      img: 'https://flowbite.com/docs/images/people/profile-picture-1.jpg',
    },
    {
      user_id: 2,
      firstname: 'LOREM',
      lastname: 'IPSUM',
      faculty: 'คณะเทคโนโลยีสารสนเทศ',
      branch: 'สาขาเทคโนโลยีสารสนเทศ',
      img: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
    },
    {
      user_id: 3,
      firstname: 'LOREM',
      lastname: 'IPSUM',
      faculty: 'คณะเทคโนโลยีสารสนเทศ',
      branch: 'สาขาเทคโนโลยีสารสนเทศ',
      img: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
    },
    {
      user_id: 4,
      firstname: 'LOREM',
      lastname: 'IPSUM',
      faculty: 'คณะเทคโนโลยีสารสนเทศ',
      branch: 'สาขาเทคโนโลยีสารสนเทศ',
      img: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
    },
    {
      user_id: 5,
      firstname: 'LOREM',
      lastname: 'IPSUM',
      faculty: 'คณะเทคโนโลยีสารสนเทศ',
      branch: 'สาขาเทคโนโลยีสารสนเทศ',
      img: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    },

  ];

  friendsList: any[] = []
  friendsRequest: any[] = []

  userData: any;
  socialType: any;

  search: any = ''
  pagination: any

  isLoading: boolean = false
  isPaginateLoading: boolean = false

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   * @param {UserProfileListService} _userProfileListService
   */
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _socialNetworkService: SocialNetworkService,
    private cookieService: CookieService,
    private _changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private _appComponent: AppComponent,
    private dialog: MatDialog,

  ) {
    // this.formGroup = this._formBuilder.group({
    //   email: [''],
    //   password: [''],
    // });
  }


  // selectedFaculty: string = '';
  // faculties: string[] = ['เทคโนโลยีสารสนเทศ']; // Your list of Faculties
  // filteredFaculties: string[] = this.faculties;

  ngOnInit() {
    console.clear()
    window.alertClose()
    // window.alertLoading()
    const userFromStoreData = this.cookieService.get('user');
    const url = this.cookieService.get('url');
    this.userData = JSON.parse(userFromStoreData);
    switch (url) {
      case '/social-network/friends/list':
        console.log('friend-list');
        this.socialType = 'list'
        this._socialNetworkService.friendListData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
          if (!this.isPaginateLoading) {
            this.friendsList = result.data
          } else {
            this.friendsList.push(...result.data)
          }
          this.pagination = result.pagination
          console.log('pagination: ',this.pagination);
          
          this._changeDetectorRef.markForCheck()
        })

        this._socialNetworkService.friendRequestListData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
          this.friendsRequest = result.data
          this._changeDetectorRef.markForCheck()
        })
        break;

      case '/social-network/friends/search':
        console.log('friend-search');
        this.socialType = 'search'
        break;

    }


  }

  // onKeyUp(event: any) {
  //   // console.log(event);
  //   if (event.keyCode == 13) {
  //     this.searching()
  //   }
  // }

  onSearchValChange(searchVal: any) {
    this.search = searchVal
    this._changeDetectorRef.markForCheck()
  }

  // สำหรับ load page เพิ่ม
  paginationTrigger() {
    this.isPaginateLoading = true
    this.searching()
  }

  searching() {
    let step: any
    if (!this.isPaginateLoading) {
      this.isLoading = true
      this.friendsList = []
    } else {
      step = this.pagination.step + this.pagination.limit
    }
    this.getFriendList(step)
  }

  getFriendList(step: any = null) {
    let param: any = {
      user_id: this.userData?.user_id,
      faculty_name: this.userData?.faculty_name,
      branch_name: this.userData?.branch_name,
      search: this.search
    }
    if (this.isPaginateLoading) {
      param.step = step
    }
    this._socialNetworkService.getFriendList(param)
      .pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
        if (result.response_code == 200) {
          this.isLoading = false
          this.isPaginateLoading = false
          window.alertClose()
        } else {
          window.alertFail(result.response_desc)
        }
        this._changeDetectorRef.markForCheck()
      }, (e) => {
        console.log(e);
        window.alertFail(e?.error?.response_desc)
        this._changeDetectorRef.markForCheck()
      })
  }


  manageFriend(friend_data: any, action: string) {
    console.clear()
    this._changeDetectorRef.markForCheck()
    let data: any;
    switch (action) {
      case 'add':
        data = { user_id: this.userData.user_id, friend_id: friend_data.user_id, friend_status: enumFriendStatus.accepted }
        console.log(data);
        this.friendsList.push(friend_data)
        this.friendsRequest = this.friendsRequest.filter(request => request.user_id !== friend_data.user_id);
        this._socialNetworkService.addUpdateFriendship(data).subscribe((result: any) => {
          if (result.response_code == 200) {
            this._socialNetworkService.getFriendList(this.userData).subscribe((result: any) => {
              this._changeDetectorRef.markForCheck()
              this.friendsList = result.data
              console.log(this.friendsList);
              if (result.response_code != 200) {
                this._changeDetectorRef.markForCheck();
                window.alertFail(result.response_desc)
                window.location.reload()
              }
            })
            this._socialNetworkService.getFriendRequest(this.userData).subscribe((result: any) => {
              this._changeDetectorRef.markForCheck()
              this.friendsRequest = result.data
              if (result.response_code != 200) {
                this._changeDetectorRef.markForCheck();
                window.alertFail(result.response_desc)
                window.location.reload()
              }
            })
          } else {
            window.alertFail(result.response_desc)
            this._changeDetectorRef.markForCheck();
          }
        }, (e) => {
          console.log(e);
          window.alertFail(e.error.response_desc).then(() => {
            location.reload()
          })
        })
        break;

      case 'cancel':
        console.log('cancel | ', friend_data);
        data = { user_id: friend_data.user_id, friend_id: this.userData.user_id }
        this.friendsRequest = this.friendsRequest.filter(request => request.user_id !== friend_data.user_id);
        this._socialNetworkService.cancelFriend(data).subscribe((result: any) => {
          if (result.response_code == 200) {
            this._socialNetworkService.getFriendRequest(this.userData).subscribe((result: any) => {
              this._changeDetectorRef.markForCheck()
              this.friendsRequest = result.data
              if (result.response_code != 200) {
                this._changeDetectorRef.markForCheck();
                window.alertFail(result.response_desc)
                window.location.reload()
              }
            })
          } else {
            window.alertFail(result.response_desc)
            this._changeDetectorRef.markForCheck();
          }
        })

        break;
    }
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
        this._socialNetworkService.deleteFriend(data)
          .pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
            if (result.response_code == 200) {
              this.getFriendList()
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

  go(path: string, userId: any = null) {
    if (path != '/account/other-profile') {
      this._router.navigate([path])
    } else {
      this._router.navigate([path, userId])
    }
  }
}
