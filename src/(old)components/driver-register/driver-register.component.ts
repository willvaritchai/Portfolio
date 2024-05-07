import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SigninService } from '../home/sign-in.service';
import { CookieService } from 'ngx-cookie-service';
declare var window: any
@Component({
  selector: 'driver-register',
  templateUrl: './driver-register.component.html',
  styleUrls: ['./driver-register.component.scss'],
})
export class DriverRegisterComponent implements OnInit {

  //Get type from home component
  @Input() type: string | undefined;

  /**
       * Constructor
       *
       * @param {HttpClient} _httpClient
       */
  constructor(
    // private _userService: SigninService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) { }



  ngOnInit() {
  }
}
