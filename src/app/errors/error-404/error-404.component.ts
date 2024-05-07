import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';
import { Location } from '@angular/common';

@Component({
  selector: 'error-404',
  templateUrl: './error-404.component.html',
})
export class NotFoundComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
       * Constructor
       *
       * @param {HttpClient} _httpClient
       */
  constructor(
    private appComponent: AppComponent,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  goHome(url:string = '') {
    this._router.navigate(['portfolio'])
  }


}
