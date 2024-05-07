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
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';

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
  selector: 'vehicle-collections',
  templateUrl: './vehicle-collections.component.html',
})
export class VehicleCollectionsComponent implements OnInit, OnChanges {
  @Input() detail: any | undefined;
  @Input() type: string | undefined;
  @Input() extraType: string | undefined;
  @Input() vehicleList: any | undefined;
  @Input() userId: any | undefined;
  @Input() inputFormGroup: any | undefined;

  @Output() vehicleOutput: EventEmitter<any> = new EventEmitter<any>();

  eventDetail: any;
  autoFilledData: any;

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
    private _getExtraDataService: GetExtraDataService,
  ) {
    this.editDetailFormGroup = this._formBuilder.group({
      vehicle_id: [null, Validators.required],
      seats: [null, [Validators.required]],
      seat_type: [null],
      vehicle_selected_obj: [null]
    });

    // let formName: string
    this.editDetailFormGroup.get('seat_type')?.valueChanges.subscribe(value => {
      this.editDetailFormGroup.get('seats')?.reset()
      // type = 0 = รับเต็มจำนวน
      if (this.editDetailFormGroup.get('seat_type')?.value == 0) {
        let maxSeats = this.editDetailFormGroup.get('vehicle_selected_obj')?.value.seats
        this.editDetailFormGroup.get('seats')?.setValue(maxSeats)
      }
    })

    // this.editDetailFormGroup.get('seats')?.valueChanges.subscribe(value => {
    //   // if (this.type == 'edit' && value > this.detail.seats) {
    //   //   this.editDetailFormGroup.get('seats')?.setValue(this.detail.seats)
    //   // }
    // })

    this.editDetailFormGroup.valueChanges.subscribe(value => {
      this.vehicleOutput.emit(this.editDetailFormGroup.getRawValue())
    })



  }

  ngOnInit() {
    // console.clear()
    this.autoFilledData = this._getExtraDataService.getDataLocStorage('auto_filled')
    // if (this.autoFilledData) {

    // }

    this.editDetailFormGroup.patchValue(this.inputFormGroup)

    if (this.type != 'edit' && this.extraType != 'editFav') {
      this.getVehicle(this.userId);
    } else {
      console.log('✏️', this.type);
      this._eventService.vehicleListData.subscribe((result: any) => {
        // console.log('wtf-data', result);
        this.vehicleList = result?.data;
        console.log('🚗🚜🚕', this.vehicleList);
        console.log(this.eventDetail);
        // console.log('filter: ', this.vehicleList.filter((v: any) => this.eventDetail.vehicle_id == v.vehicle_id));
        let vehicleFilterd = this.vehicleList?.filter((v: any) => this.eventDetail.vehicle_id == v.vehicle_id)[0]
        this.editDetailFormGroup.get('vehicle_selected_obj')?.setValue(vehicleFilterd)
        // set = รับเต็มจำนวน
        if (this.eventDetail?.seats == vehicleFilterd?.seats) {
          this.editDetailFormGroup.get('seat_type')?.setValue(0)
        } else { // จำกัดจำนวน
          this.editDetailFormGroup.get('seat_type')?.setValue(1)
          this.editDetailFormGroup.get('seats')?.setValue(this.eventDetail.seats)
        }
        this._changeDetectorRef.markForCheck();
      });
      console.log('vehicle-edited 📝: ', this.editDetailFormGroup.getRawValue());
    }
  }

  getVehicle(id: any) {
    this._eventService.getVehicle(id).subscribe((result: any) => {
      this.vehicleList = result.data;
      console.log('🚗🚜🚕', this.vehicleList);
      window.alertClose()
      this.selectVehicle()
      this._changeDetectorRef.markForCheck();
      return this.vehicleList
    });
  }

  selectVehicle() {
    if (localStorage.getItem('fav_route')) {
      this.eventDetail = this._getExtraDataService.getDataLocStorage('fav_route')
      let vehicleFilterd = this.vehicleList?.filter((v: any) => this.eventDetail.vehicle_id == v.vehicle_id)[0]
      this.editDetailFormGroup.get('vehicle_selected_obj')?.setValue(vehicleFilterd)
      // set = รับเต็มจำนวน
      if (this.eventDetail?.seats == vehicleFilterd?.seats) {
        this.editDetailFormGroup.get('seat_type')?.setValue(0)
      } else { // จำกัดจำนวน
        this.editDetailFormGroup.get('seat_type')?.setValue(1)
        this.editDetailFormGroup.get('seats')?.setValue(this.eventDetail.seats)
      }
      this._changeDetectorRef.markForCheck();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes: ', changes);
    if (changes['detail']?.currentValue) {
      this.eventDetail = changes['detail'].currentValue;
      this._changeDetectorRef.markForCheck();
    }

    // if (changes['inputFormGroup']?.currentValue) {
    //   this.editDetailFormGroup.patchValue(changes['inputFormGroup'].currentValue)
    //   this._changeDetectorRef.markForCheck();
    // }

  }

  // vehicle-Selected-function
  vehicleSelected(vehicle: any) {
    console.log('vehicle-selected: ', vehicle);
    this.editDetailFormGroup.get('vehicle_selected_obj')?.setValue(vehicle)
    this.editDetailFormGroup.get('seat_type')?.setValue(0)
    this.editDetailFormGroup.get('vehicle_id')?.setValue(vehicle.vehicle_id)
  }

}