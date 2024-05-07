import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDetalService } from './event-detail.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SigninService } from '../home/sign-in.service';
import { CookieService } from 'ngx-cookie-service';
declare var window: any
// declare var window: { alertLoading: () => void; alertSuccess: () => void;alertFail: (message: any) => void;};
@Component({
  selector: 'event-detail',
  templateUrl: './event-detail.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetalComponent implements OnInit {

  //Get type from home component
  @Input() type: string | undefined;
  // @ViewChild('eventForm', { static: true }) eventForm: NgForm | undefined;

  eventDetail: any;
  members: any;
  friendtype: any | undefined;
  mutalfriend: any | undefined;
  userId: any;
  cookie: any;
  role: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  datePipe: any;
  eventId: any;
  rawEventId: any;
  isJoin: any = false;
  isSuccess: boolean = false;
  /**
       * Constructor
       *
       * @param {HttpClient} _httpClient
       */
  constructor(
    private _eventService: EventDetalService,
    // private _userService: SigninService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) { }



  ngOnInit() {
    window.alertClose()
    if (this.cookieService.get('user') == '') {
      this._router.navigate(['/auth/sign-in'])
    } else {
      this.cookie = JSON.parse(this.cookieService.get('user'));
      this.userId = this.cookie.user_id;
      this.role = this.cookie.role_id;
    }
    // console.log('userId: ',userId);
    this.eventId = this.route.snapshot.params['id'];
    this._eventService.eventByIdData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      console.log('event-detail: ', result);
      this.eventDetail = result.data;
      this.rawEventId = this.eventDetail.event_id
      this.members = result.data.members;
      this.members.forEach((element: any) => {
        if (element.user_id == this.userId) {
          this.isJoin = true;
        }
      });
      this._changeDetectorRef.markForCheck();
    });
  }
  reloadEventDetail() {
    let params = { user_id: this.userId };
    this._eventService.getById(this.eventId, params).subscribe((result: any) => {
      console.log('event-detail-test: ', result);
      this.eventDetail = result.data;
      this.members = result.data.members;
      this.members.forEach((element: any) => {
        if (element.user_id == this.userId) {
          this.isJoin = true;
        }
      });
      this._changeDetectorRef.markForCheck();
    });
  }

  joinEvent() {
    if (this.eventDetail.status == null) {
      window.alertLoading();
      // let params = this.route.snapshot.params['id'];
      let params = { event_id: this.rawEventId, user_id: this.userId };
      console.log('join-event-test: ', params);
      this._eventService.joinEvent(params).subscribe((result: any) => {
        console.log('join-event-test: ', result);
        if (result.response_desc == 'success') {
          this.reloadEventDetail();
          window.alertSuccess();
          this._router.navigate(['/chat'])
        } else {
          console.log('join-event-test: ', result.response_desc);
          switch (result.response_code == 422) {
            case result.response_desc == "Member Already Join Event":
              window.alertFail("ไม่สามารถบันทึกได้ เนื่องจากมีผู้เข้าร่วมกิจกรรมแล้ว");
              break;
            case result.response_desc == "Already Joined Other Event":
              window.alertFail("ไม่สามารถบันทึกได้ เนื่องจากผู้ใช้สามารถเข้าร่วมได้เพียง1กิจกรรม");
              break;
            default: window.alertFail("ไม่สามารถบันทึกได้ กรุณาลองใหม่อีกครั้ง");
              break;
          }
          this.reloadEventDetail();
        }
      });
    }
  }

  goChat() {
    this._router.navigate(['/chat/event', this.eventId])
  }
}
