import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';
import Swal from 'sweetalert2';
import { imgAsset } from 'src/environment-variables/img.asset.service';
import { CookieService } from 'ngx-cookie-service';
import { SudoSignInService } from './sudo-sign-in.service';
import { AppComponent } from 'src/app/app.component';
declare var window: any;
@Component({
  selector: 'sudo-sign-in',
  templateUrl: './sudo-sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SudoSignInComponent implements OnInit {
  kmuttLogo = imgAsset.kmuttLogo

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  signInFormGroup: FormGroup;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   * @param {UserProfileListService} _userProfileListService
   */
  constructor(
    private _sudoSignInService: SudoSignInService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private cookieService: CookieService,
    private appComponent: AppComponent,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    this.signInFormGroup = this._formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  userListMock: any;
  ngOnInit() {
    // this._sudoSignInService.getAllUser().pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
    // })
    this.cookieService.deleteAll()

    this.appComponent.detectShowNav(false)
    this._changeDetectorRef.markForCheck()
  }


  go(path: string) {
    this._router.navigate([path])
  }
}