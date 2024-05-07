import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation, ElementRef, Output, EventEmitter, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EventDetalService } from '../event-detail.service';
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

declare var window: any


// const MY_MOMENT_FORMATS = {
//   parseInput: 'DD/MM/YYYY HH:mm:ss',
//   fullPickerInput: 'DD/MM/YYYY HH:mm:ss',
//   datePickerInput: 'DD/MM/YYYY',
//   timePickerInput: 'HH:mm:ss',
//   monthYearLabel: 'MMM YYYY',
//   dateA11yLabel: 'LL',
//   monthYearA11yLabel: 'MMMM YYYY',
// };
@Component({
  selector: 'cost-type',
  templateUrl: './cost-type.component.html',
  styleUrls: ['../event-detail.component.scss'],
})
export class CostTypeComponent implements OnInit, OnChanges {
  @Input() detail: any | undefined;
  @Input() type: string | undefined;
  @Input() extraType: any | undefined;
  // @Input() vehicleList: any | undefined;
  @Input() userId: any | undefined;
  @Input() inputFormGroup: any | undefined;
  @Input() distance: any | undefined;
  oldDistance: any

  @Output() costTypeOutput: EventEmitter<any> = new EventEmitter<any>();

  eventDetail: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  editDetailFormGroup: FormGroup;



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
    private _formBuilder: FormBuilder,
    private cookieService: CookieService,
    private dialog: MatDialog,
    private ngZone: NgZone,
    private _appComponent: AppComponent,
    private _validateFormsService: ValidateFormsService,
  ) {
    this.editDetailFormGroup = this._formBuilder.group({
      costs: [null, [Validators.required]],
      cost_type: [null, [Validators.required]],
      cost_suggest: [null],
      distance: [null],
    });

    this.editDetailFormGroup.get('cost_type')?.valueChanges.subscribe(value => {
      console.log('cost_type activated?');
      if (this.type == 'create' || (this.type == 'edit' && this.editDetailFormGroup.get('costs')?.value == 0)) {
        this.editDetailFormGroup.get('costs')?.reset()
      }
      if (value == '0') {
        this.editDetailFormGroup.get('costs')?.setValue(0);
      }
      if (value == '1') {
        this.editDetailFormGroup.get('costs')?.setValue(this.editDetailFormGroup.get('cost_suggest')?.value);
      }
      if ((value == '2' && this.editDetailFormGroup.get('costs')?.value == 0)
        || value == 2 && this.editDetailFormGroup.get('cost_suggest')?.value) {
        this.editDetailFormGroup.get('costs')?.reset()
      }

      console.log(this.editDetailFormGroup.getRawValue());
    })

    this.editDetailFormGroup.get('cost_suggest')?.valueChanges.subscribe(value => {
      if (value == 1) {
        this.editDetailFormGroup.get('costs')?.setValue(value)
      }
    })

    this.editDetailFormGroup.get('distance')?.valueChanges.subscribe(value => {
      // console.log('distance: ', value? true:false);

      if (!value && this.editDetailFormGroup.get('cost_type')?.value == 1) {
        this.editDetailFormGroup.get('cost_type')?.reset()
        this.editDetailFormGroup.get('costs')?.reset()
      }
      // console.log(this.editDetailFormGroup.getRawValue());
    })

    this.editDetailFormGroup.valueChanges.subscribe(value => {
      this.costTypeOutput.emit(this.editDetailFormGroup.getRawValue())
      _changeDetectorRef.markForCheck()
    })



  }

  ngOnInit() {
    this.editDetailFormGroup.patchValue(this.inputFormGroup)
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes: ', changes);
    // if (changes['detail']?.currentValue) {
    //   this.eventDetail = changes['detail'].currentValue;
    //   this._changeDetectorRef.markForCheck();
    // }
    if (this.distance != this.oldDistance) {
      console.log('distance: ', this.distance);
      if (isNaN(this.distance)) {
        this.distance = parseFloat(this.distance && this.distance.includes(',') ? this.distance.replace(/,/g, '') : this.distance)
      }
      this.oldDistance = this.distance
      this.editDetailFormGroup.get('distance')?.setValue(this.distance ? this.distance : null)
      this.costSuggestion(this.distance ? this.distance : 0)
      this._changeDetectorRef.markForCheck()
    }
  }

  costSuggestion(distance: number) {
    if (distance >= 1 && distance < 10) {
      this.editDetailFormGroup.get('cost_suggest')?.setValue(this.ceilOrFloor(distance, 3))
    }
    else if (distance >= 10 && distance < 20) {
      this.editDetailFormGroup.get('cost_suggest')?.setValue(this.ceilOrFloor(distance, 3.5))
    }
    else if (distance >= 20 && distance < 40) {
      this.editDetailFormGroup.get('cost_suggest')?.setValue(this.ceilOrFloor(distance, 4))
    }
    else if (distance >= 40) {
      this.editDetailFormGroup.get('cost_suggest')?.setValue(this.ceilOrFloor(distance, 4.5))
    }
    // console.log(this.costSuggest);
    this._changeDetectorRef.markForCheck()
  }

  ceilOrFloor(distance: number, cost: number) {
    return distance % 1 >= 0.5 ? Math.ceil(distance * cost) : Math.floor(distance * cost)
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      width: '100%',
      data: 'cost_suggestion'
    });
    dialogRef.afterClosed().subscribe(result => {
      this._changeDetectorRef.markForCheck()
    })
  }
}