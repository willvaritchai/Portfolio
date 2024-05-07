import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialNetworkService } from '../social-network.service';
import { Subject, takeUntil } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { enumFriendStatus } from 'src/environment-variables/variables.service';
import { AppComponent } from 'src/app/app.component';
declare var window: any;
@Component({
  selector: 'friends-suggestion',
  templateUrl: './friends-suggestion.component.html',
})
export class FriendsSuggestionComponent implements OnInit {
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

  socialType: any;
  userData: any;
  url: any

  isLoading: boolean = false
  isPaginateLoading: boolean = false
  pagination: any
  search: any = ''

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
    private _appComponent: AppComponent,

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
    // window.alertLoading()
    this.url = this.cookieService.get('url');
    if (this.url == '/social-network/friends/search') {
      this.socialType = 'search'
      const userFromStoreData = this.cookieService.get('user');
      this.userData = JSON.parse(userFromStoreData);
    }

    if (this.url == '/social-network/friends/suggestion') {
      this.socialType = 'suggestion'
      const userFromStoreData: any = localStorage.getItem('user-signup');
      this.userData = JSON.parse(userFromStoreData);
    }

    this._socialNetworkService.friendSuggestSearchData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      console.log('social-list: ', result);

      if (!this.isPaginateLoading) {
        this.socialList = result.data
      } else {
        this.socialList.push(...result.data)
      }
      this.pagination = result.pagination
      if (result.response_desc == 'success' && !this.search) {
        window.alertClose()
      }
      this._changeDetectorRef.markForCheck()
    })
  }

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
      this.socialList = []
      this.isLoading = true
    } else {
      step = this.pagination.step + this.pagination.limit
    }
    this.getFriendSuggestion(step)
  }



  getFriendSuggestion(step: any = null) {
    console.log('getFriendSuggestion');
    let params: any = {
      faculty_name: this.userData.faculty_name
      , branch_name: this.userData.branch_name
      , user_id: this.userData.user_id
      , search_friend: true
      , search: this.search

    }
    if (this.isPaginateLoading) {
      params.step = step
    }
    this._socialNetworkService.getFriendListSuggestSearch(params).pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      if (result.response_code == 200) {
        this.isLoading = false
        this.isPaginateLoading = false
      } else {
        window.alertFail(result.response_desc)
      }
      this._changeDetectorRef.markForCheck()
    })
  }

  // filterFaculties() {
  //   this.filteredFaculties = this.faculties.filter(faculty =>
  //     faculty.toLowerCase().includes(this.selectedFaculty.toLowerCase())
  //   );
  // }

  manageFriend(friend_data: any, action: string) {
    console.clear()
    let data: any;
    switch (action) {
      case 'add':
        console.log('add');
        console.log('my_id: ', this.userData.user_id, ' | ', 'friend_id: ', friend_data.user_id);
        data = { user_id: this.userData.user_id, friend_id: friend_data.user_id, friend_status: enumFriendStatus.pending }
        friend_data.my_id = data.user_id
        friend_data.friend_id = data.friend_id
        friend_data.friend_status = data.friend_status
        this._socialNetworkService.addUpdateFriendship(data).subscribe((result: any) => {
          console.log(result);
          console.log(this.socialList);

          if (result.response_code == 200) {
          } else {
            window.alertFail(result.response_desc)
            this._changeDetectorRef.markForCheck();

          }
        })
        break;
      case 'cancel':
        console.log('cancel');
        data = { user_id: this.userData.user_id, friend_id: friend_data.user_id }
        friend_data.my_id = null
        friend_data.friend_id = null
        friend_data.friend_status = null
        this._socialNetworkService.cancelFriend(data).subscribe((result: any) => {
          console.log(result);
        })

        break;
    }




  }


  go(path: string, userId: any = null) {
    if (path != '/account/other-profile') {
      window.alertLoading()
      console.log('friend-suggest: go to home');
      const userDataStorage: any = localStorage.getItem('user-signup')
      const userDataFromSignUp = JSON.parse(userDataStorage);
      this._appComponent.setUserCookie(userDataFromSignUp, true)
      // this.cookieService.set('user', JSON.stringify(userDataFromSignUp),undefined,'/')
      // this.cookieService.delete('user-signup', '/')
      localStorage.removeItem('user-signup')
      localStorage.removeItem('ms-account')
      setTimeout(() => {
        this._router.navigate([path])
      }, 500);
    } else {
      this._router.navigate([path, userId])
    }

  }
}
