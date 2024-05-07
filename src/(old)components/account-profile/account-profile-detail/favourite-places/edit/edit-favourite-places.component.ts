import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';
import { AccountProfileService } from 'src/components/account-profile/account-profile.service';
import { AppComponent } from 'src/app/app.component';

declare var window: any
@Component({
  selector: 'edit-favourite-places.component',
  templateUrl: './edit-favourite-places.component.html',
  // encapsulation: ViewEncapsulation.None,
})
export class EditFavouritePlacesComponent implements OnInit {

  //Get type from home component
  @Input() type: string | undefined;
  // @ViewChild('eventForm', { static: true }) eventForm: NgForm | undefined;

  eventDetail: any;
  friendtype: any | undefined;
  mutalfriend: any | undefined;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  datePipe: any;
  cookie: any;
  userId: any;
  isSuccess: boolean = false;
  /**
       * Constructor
       *
       * @param {HttpClient} _httpClient
       */
  constructor(
    private _appComponent: AppComponent,
    private _accountProfileService: AccountProfileService,
    // private _eventService: EventDetalService,
    // private _userService: SigninService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) { }



  ngOnInit() {
    this._accountProfileService.favRouteById.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      console.log('route-detail: ', result);
      this.eventDetail = result.data;
      window.alertClose()
      this._changeDetectorRef.markForCheck();
    });
  }

  go(url: string) {
    this._appComponent.go(url)
  }
}
