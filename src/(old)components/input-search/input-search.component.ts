import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation, ElementRef, Output, EventEmitter, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, startWith, map, take, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { MAT_DATE_FORMATS, ThemePalette } from '@angular/material/core';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmDialogComponent } from 'src/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { ValidateFormsService } from 'src/services/ValidateFormService.service';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';

declare var window: any

@Component({
  selector: 'input-search',
  templateUrl: './input-search.component.html',
})
export class InputSearchComponent implements OnInit {

  @Output() searchOutput: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchValue: EventEmitter<any> = new EventEmitter<any>();

  search: any = ''

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
    private _formBuilder: FormBuilder,
    private cookieService: CookieService,
    private dialog: MatDialog,
    private ngZone: NgZone,
    private _appComponent: AppComponent,
    private _validateFormsService: ValidateFormsService,
    private _getExtraDataService: GetExtraDataService,
  ) {
  }

  ngOnInit() {

  }

  onKeyUp(event: any) {
    // console.log(event);
    if (event.keyCode == 13) {
      this.searching()
    }
  }

  searching() {
    // console.log('search: ', this.search);
    const param = { search: this.search };
    this.searchOutput.emit(param)
  }

  searchModelChange(searchModel: any) {
    this.searchValue.emit(searchModel)
  }
}