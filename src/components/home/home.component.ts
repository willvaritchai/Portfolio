import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';


declare var window: any;
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();


  private isMsalInitialized: boolean = false;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   * @param {UserProfileListService} _userProfileListService
   */
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private cookieService: CookieService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _appComponent: AppComponent,
    private _getExtraDataService: GetExtraDataService,
    private elementRef: ElementRef,

  ) {


  }

  ngOnInit(): void {

  }

}
