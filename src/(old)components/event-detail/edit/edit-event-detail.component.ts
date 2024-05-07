import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDetalService } from '../event-detail.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

declare var window: {
  alertConformDelete(): unknown;
  alertLoading: () => void; alertSuccess: () => void; alertFail: (message: any) => void;
  alertClose(): void;
};
@Component({
  selector: 'edit-event-detail',
  templateUrl: './edit-event-detail.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: ['../event-detail.component.scss'],
})
export class EditEventDetalComponent implements OnInit {

  //Get type from home component
  @Input() type: string | undefined;
  // @ViewChild('eventForm', { static: true }) eventForm: NgForm | undefined;

  eventDetail: any;
  members: any;
  friendtype: any | undefined;
  mutalfriend: any | undefined;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  datePipe: any;
  eventId: any;
  cookie: any;
  userId: any;
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
    if(this.cookieService.get('user') == '') {
      this._router.navigate(['/auth/sign-in'])
    }else{
      this.cookie = JSON.parse(this.cookieService.get('user'));
      this.userId = this.cookie.user_id;
    }
    this.eventId = this.route.snapshot.params['id'];
    this._eventService.eventByIdData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      console.log('event-detail: ', result);
      this.eventDetail = result.data;
      this.members = result.data.members;
      this._changeDetectorRef.markForCheck();
    });
  }

  // deleteEvent(eventId: string) {
  //   // window.alertConformDelete().then((result:any) => {
  //   //   if (result.isConfirmed) {
  //       window.alertLoading();
  //       this._eventService.deleteEvent(eventId).pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
  //         console.log('delete-event: ', result);
  //         if (result.response_desc === "success") {
  //           window.alertSuccess();
  //           this._router.navigate(['/home']);
  //         } else {
  //           window.alertFail("ไม่สามารถลบได้ กรุณาลองใหม่อีกครั้ง");
  //         }
  //       });
  //     }
}
