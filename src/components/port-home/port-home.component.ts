import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

declare var window: any;
@Component({
  selector: 'port-home',
  templateUrl: './port-home.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PortHomeComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();


  private isMsalInitialized: boolean = false;
  @Input() screenType: string | undefined;

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
    private elementRef: ElementRef,

  ) {


  }

  ngOnInit(): void {

  }

}
