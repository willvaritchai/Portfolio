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
  selector: 'create-event-detail',
  templateUrl: './create-event-detail.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: ['../event-detail.component.scss'],
})
export class CreateEventDetalComponent implements OnInit {

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
  isSuccess: boolean = false;
  cookie: any;
  // role:any;
  userId: any;
  vehicle: any;
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
  //   if(this.cookieService.get('user') == '') {
  //     this._router.navigate(['/auth/sign-in'])
  //   }else{
  //     this.cookie = this.cookieService.get('user');
  //     this.userId = this.cookie.user_id;
  //     this.role = this.cookie.role_id;
  //   }
  // }
  if(this.cookieService.get('user') != '') {
    this.cookie = JSON.parse(this.cookieService.get('user'));
    this.userId = this.cookie.user_id;
    this.getVehicle(this.userId);
  }
}
getVehicle(id:any){
  this._eventService.getVehicle(id).subscribe((result: any) => {
    console.log('vehicle: ',result);
    this.vehicle = result.data;
    this._changeDetectorRef.markForCheck();
  });
}
}
