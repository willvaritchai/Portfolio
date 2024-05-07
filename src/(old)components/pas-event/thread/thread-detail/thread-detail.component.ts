import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { ThreadService } from '../thread.service';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';
import { unAuthorizeMessage } from 'src/environment-variables/variables.service';

declare var window: any
@Component({
  selector: 'thread-detail',
  templateUrl: './thread-detail.component.html',
  // encapsulation: ViewEncapsulation.None,
  // styleUrls: ['/src/components/event-detail/event-detail.component.scss'],
})
export class ThreadDetailComponent implements OnInit {

  //Get type from home component
  @Input() type: string | undefined;
  // @ViewChild('eventForm', { static: true }) eventForm: NgForm | undefined;
  url: string = ''
  threadDetail: any;
  members: any;
  friendtype: any | undefined;
  mutalfriend: any | undefined;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  datePipe: any;
  eventId: any;
  isSuccess: boolean = false;
  cookie: any;
  // role:any;
  userId: any;
  vehicle: any;
  checkAuthorize: boolean = true
  /**
       * Constructor
       *
       * @param {HttpClient} _httpClient
       */
  constructor(
    private _threadService: ThreadService,
    private _getExtraDataService: GetExtraDataService,
    // private _userService: SigninService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private location: Location,
  ) { }



  ngOnInit() {
    //   if(this.cookieService.get('user') == '') {
    //     this._router.navigate(['/auth/sign-in'])
    //   }else{
    //     this.cookie = this.cookieService.get('user');
    //     this.userId = this.cookie.user_id;
    //     this.role = this.cookie.role_id;
    //   }
    // }
    if (this.cookieService.get('user') != '') {
      this.cookie = JSON.parse(this.cookieService.get('user'));
      this.userId = this.cookie.user_id;
      // this.getVehicle(this.userId);
      // this._changeDetectorRef.markForCheck();
      this.url = this._getExtraDataService.getCurrentUrl()
      console.log('current-url-threadDetail: ', this.url);
      let state: any = this._getExtraDataService.getLocationState()
      // console.log(threadId);
      if (this.url == '/threads/detail') {
        this.getThreadOwner(state.id, this.userId)
      }
      this._threadService.pasEventDetail(state?.id).subscribe((result: any) => {
        if (result.response_desc == 'success') {
          this.threadDetail = result.data;
          console.log('thread-detail: ', this.threadDetail);
          if (this.url == '/threads/detail') {
            this.checkBothHaveData()
          } else {
            window.alertClose()
          }
        } else {
          window.alertFail(result.response_desc)
        }
        this._changeDetectorRef.markForCheck();
      }, (e) => {
        this.checkAuthorize = false
        window.alertFail(unAuthorizeMessage.val).then(() => {
          this._router.navigate(['/'])
        })
      });
    }
  }

  getThreadOwner(threadId: any, my_id: any) {
    const params = { thread_id: threadId, my_id: this.userId };
    this._threadService.getThreadOwner(params).subscribe((result: any) => {
      if (result.response_desc == 'success') {
        this.members = result.data;
        console.log("thread's owner: ", this.threadDetail);
        this.checkBothHaveData()
      } else {
        window.alertFail(result.response_desc)
      }
      this._changeDetectorRef.markForCheck();
    });
  }

  checkBothHaveData() {
    if (this.members && this.threadDetail) {
      window.alertClose()
      this._changeDetectorRef.markForCheck()
    }
  }

  back() {
    this.location.back()
  }

}
