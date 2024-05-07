import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from './about-us.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SigninService } from '../home/sign-in.service';
import { CookieService } from 'ngx-cookie-service';
import { AccountProfileService } from '../account-profile/account-profile.service';
import { AppComponent } from 'src/app/app.component';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';
import { Location } from '@angular/common';
import { imgAsset } from 'src/environment-variables/img.asset.service';
declare var window: any;

@Component({
  selector: 'about-us',
  templateUrl: './about-us.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AboutUsComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
       * Constructor
       *
       * @param {HttpClient} _httpClient
       */
  constructor(
    private _homeService: HomeService,
    private _userService: SigninService,
    private _getExtraDataService: GetExtraDataService,
    private _router: Router,
    private cookieService: CookieService,
    private _accountProfileService: AccountProfileService,
    private _appComponent: AppComponent,
    private elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    private location: Location,

  ) { }

  joeWhite:any = imgAsset.joeWhite
  william:any = imgAsset.william
  god_phai:any = imgAsset.god_phai


  ngOnInit() {
  }

  goback() {
    this.location.back()
  }


}
