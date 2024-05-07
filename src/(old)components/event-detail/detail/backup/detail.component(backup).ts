// import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation, ElementRef, Output, EventEmitter, NgZone } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
// import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// import { EventDetalService } from '../event-detail.service';
// import { filter, startWith, map, take, takeUntil } from 'rxjs/operators';
// import { Observable, Subject } from 'rxjs';
// import { MAT_DATE_FORMATS, ThemePalette } from '@angular/material/core';
// import * as moment from 'moment';
// import { MatDatepickerInputEvent } from '@angular/material/datepicker';
// import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
// import { CookieService } from 'ngx-cookie-service';
// import { ConfirmDialogComponent } from 'src/components/confirm-dialog/confirm-dialog.component';
// import { MatDialog } from '@angular/material/dialog';
// import { AppComponent } from 'src/app/app.component';
// import { ValidateFormsService } from 'src/services/ValidateFormService.service';
// import * as e from 'cors';


// export interface PlaceSearchResult {
//   address: string;
//   location?: google.maps.LatLng;
//   imageUrl?: string;
//   iconUrl?: string;
//   name?: string;
// }

// declare var window: any

// declare var longdo: any;
// declare var maps: any;

// const MY_MOMENT_FORMATS = {
//   parseInput: 'DD/MM/YYYY HH:mm:ss',
//   fullPickerInput: 'DD/MM/YYYY HH:mm:ss',
//   datePickerInput: 'DD/MM/YYYY',
//   timePickerInput: 'HH:mm:ss',
//   monthYearLabel: 'MMM YYYY',
//   dateA11yLabel: 'LL',
//   monthYearA11yLabel: 'MMMM YYYY',
// };
// @Component({
//   selector: 'detail',
//   templateUrl: './detail.component(backup).html',
//   // encapsulation: ViewEncapsulation.None,
//   styleUrls: ['../event-detail.component.scss'],
//   styles: [
//     `
//       .display-area[hidden]{
//         display: none;
//       }
//       .display-area {
//         display: flex;
//       height: calc(100vh - 300px);

//         > div {
//           width: 100%;
//           padding: 8px;
//           height: inherit;
//           overflow: auto;

//           > * {
//             margin-bottom: 16px;
//           }
//         }
//         > app-map-display {
//           width: 100%;
//           height: inherit;
//         }
//       }
//     `,
//   ],
//   providers: [
//     // {
//     //     provide: MAT_DATE_FORMATS,
//     //     useValue: {
//     //         parse: {
//     //             dateInput: moment.ISO_8601,
//     //         },
//     //         display: {
//     //             dateInput: 'DD/MM/YYYY',
//     //             monthYearLabel: 'MMM YYYY',
//     //             dateA11yLabel: 'LL',
//     //             monthYearA11yLabel: 'MMMM YYYY',
//     //         },
//     //     },
//     // },
//     {
//       provide: MAT_RADIO_DEFAULT_OPTIONS,
//       useValue: {
//         color: 'black',
//       },
//     }
//   ],
// })
// export class DetailComponent implements OnInit, OnChanges {
//   // google-map--------------------------
//   @ViewChild('startField')
//   startField!: ElementRef;
//   @ViewChild('destField')
//   destField!: ElementRef;
//   // @Output() placeChanged = new EventEmitter<PlaceSearchResult>();
//   startPlaceAutocomplete: google.maps.places.Autocomplete | any;
//   destPlaceAutocomplete: google.maps.places.Autocomplete | any;
//   fromValue: any
//   toValue: any
//   // ------------------------------------

//   @ViewChild('autocompleteInput') autocompleteInput!: ElementRef;

//   filteredVehicleType: Observable<any[]> = new Observable<any[]>;

//   autocomplete: any;
//   //Get type from home component
//   @Input() detail: any | undefined;
//   @Input() type: string | undefined;
//   @Input() vehicleList: any | undefined;
//   @Input() members: any | undefined;

//   eventId: any;
//   dateValue: any;
//   eventDetail: any;
//   friendtype: any | undefined;
//   mutalfriend: any | undefined;
//   minDate: any;
//   maxDate: any;
//   year: any;
//   cookie: any;
//   userId: any;
//   isOwner: boolean = false;
//   private _unsubscribeAll: Subject<any> = new Subject<any>();
//   editDetailFormGroup: FormGroup;

//   vehicleTypes: any[] = ['รถยนต์', 'มอเตอร์ไซค์'];
//   vehicleTypeModel: any;

//   date = new Date();

//   // slider-for-costs-suggestion
//   disabled = false;
//   max = 100;
//   min = 0;
//   step = 1;

//   disableBtn: any

//   /**
//        * Constructor
//        *
//        * @param {HttpClient} _httpClient
//        */
//   constructor(
//     private _eventService: EventDetalService,
//     // private _userService: SigninService,
//     private _changeDetectorRef: ChangeDetectorRef,
//     private _router: Router,
//     private route: ActivatedRoute,
//     private _formBuilder: FormBuilder,
//     private cookieService: CookieService,
//     private dialog: MatDialog,
//     private ngZone: NgZone,
//     private _appComponent: AppComponent,
//     private _validateFormsService: ValidateFormsService,
//   ) {
//     this.year = new Date().getFullYear();
//     this.minDate = new Date();
//     this.maxDate = new Date(this.year, 11, 31);
//     this.editDetailFormGroup = this._formBuilder.group({
//       user_id: [null, Validators.required],
//       vehicle_id: [null, Validators.required],
//       event_name: [null, Validators.required],
//       event_detail: [null],
//       departure_time: [null, Validators.required],
//       old_seats: [null],
//       seats: [null, [Validators.required]],
//       costs: [null, [Validators.required]],
//       cost_type: [null],

//       start_point: [null, Validators.required],
//       dest_point: [null, Validators.required],
//       distance: [null],

//       start_name: [null],
//       dest_name: [null],
//       new_departure_time: [null],
//       brand: [null],
//       model: [null],
//       vehicle_color: [null],
//       license: [null],
//       vehicle_type: [null],

//       seat_type: [null],
//       vehicle_selected_obj: [null]
//     });

//     let formName: string

//     this.editDetailFormGroup.get('start_point')?.valueChanges.subscribe(value => {
//       formName = 'start_point'
//       if (_validateFormsService.checkValidateSpace(formName, value)) {
//         this.editDetailFormGroup.get(formName)?.setValue(value.trimStart())
//       }

//       // console.log('detectStartChange ทำงาน');
//       this.editDetailFormGroup.get('start_name')?.reset()
//       this.editDetailFormGroup.get('distance')?.reset()
//       // this.fromValue = null
//     })

//     this.editDetailFormGroup.get('dest_point')?.valueChanges.subscribe(value => {
//       formName = 'dest_point'
//       if (_validateFormsService.checkValidateSpace(formName, value)) {
//         this.editDetailFormGroup.get(formName)?.setValue(value.trimStart())
//       }

//       // console.log('detectDestChange ทำงาน');
//       this.editDetailFormGroup.get('dest_name')?.reset()
//       this.editDetailFormGroup.get('distance')?.reset()
//       // this.toValue = null
//     })

//     this.editDetailFormGroup.get('event_name')?.valueChanges.subscribe(value => {
//       formName = 'event_name'
//       if (_validateFormsService.checkValidateSpace(formName, value)) {
//         this.editDetailFormGroup.get(formName)?.setValue(value.trimStart())
//       }
//     })

//     // this.editDetailFormGroup.get('cost_type')?.valueChanges.subscribe(value => {
//     //   console.log('cost_type activated?');
//     //   if (this.type == 'create' || (this.type == 'edit' && this.editDetailFormGroup.get('costs')?.value == 0)) {
//     //     this.editDetailFormGroup.get('costs')?.reset()
//     //   }
//     //   const costType = this.editDetailFormGroup.get('cost_type')?.value;
//     //   if (costType == '0') {
//     //     this.editDetailFormGroup.get('costs')?.setValue(0);
//     //   }
//     //   if (costType == '1') {
//     //     this.editDetailFormGroup.get('costs')?.reset()
//     //   }
//     //   console.log(this.editDetailFormGroup.getRawValue());
//     // })

//     // this.editDetailFormGroup.get('seat_type')?.valueChanges.subscribe(value => {
//     //   this.editDetailFormGroup.get('seats')?.reset()
//     //   // type = 0 = รับเต็มจำนวน
//     //   if (this.editDetailFormGroup.get('seat_type')?.value == 0) {
//     //     let maxSeats = this.editDetailFormGroup.get('vehicle_selected_obj')?.value.seats
//     //     this.editDetailFormGroup.get('seats')?.setValue(maxSeats)
//     //   }

//     //   console.log(this.editDetailFormGroup.getRawValue());

//     // })

//     // this.editDetailFormGroup.get('seats')?.valueChanges.subscribe(value => {
//     //   console.log('seatsFormChanges: ', value);
//     //   // formName = 'seats'
//     //   // if (value && !isNaN(parseInt(value))) {
//     //   //   this.editDetailFormGroup.get(formName)?.setValue(parseInt(value))
//     //   // }
//     // })

//     // filter-vehicleTypes
//     // this.filteredVehicleType = this.editDetailFormGroup.get('vehicle_type')?.valueChanges.pipe(
//     //   startWith(''),
//     //   map(value => this._vehicleTypeFilter(value))
//     // ) as Observable<any[]>;

//     this.editDetailFormGroup.valueChanges.subscribe(value => {
//       if (this._validateFormsService.validateForm(this.editDetailFormGroup).length > 0) {
//         this.disableBtn = true
//       } else {
//         this.disableBtn = false
//       }


//     })

//   }

//   private _vehicleTypeFilter(value: any): any[] {
//     return this.vehicleTypes
//   }
//   displayVehicleTypes(vType: any): string {
//     return vType;
//   }

//   ngOnInit() {
//     // console.clear()
//     if (this.cookieService.check('user')) {
//       this.cookie = JSON.parse(this.cookieService.get('user'));
//       this.userId = this.cookie.user_id;
//       // if (this.type != 'edit') {
//       //   this.getVehicle(this.userId);
//       // }
//       this.editDetailFormGroup.patchValue({
//         user_id: this.cookie.user_id
//       });
//     }
//     if (this.userId == this.detail?.user_id) {
//       this.isOwner = true;
//     } else {
//       this.isOwner = false;
//     }
//     console.log('isOwner: ', this.isOwner);
//     console.log('detail: ', this.detail);
//     this.eventId = this.route.snapshot.params['id'];
//     this._changeDetectorRef.markForCheck();
//     if (this.type === 'edit') {
//       this.editDetailFormGroup.patchValue({
//         start_point: this.detail.start_point,
//         dest_point: this.detail.dest_point,
//         start_name: this.detail.start_name,
//         dest_name: this.detail.dest_name,
//         distance: this.detail.distance,
//         costs: this.detail.costs,
//         departure_time: this.detail.departure_time,
//         new_departure_time: new Date(this.detail.departure_time),
//         event_name: this.detail.event_name,
//         event_detail: this.detail.event_detail,
//         old_seats: this.detail.seats,
//         seats: this.detail.seats,
//         vehicle_id: this.detail.vehicle_id,
//         cost_type: this.detail.cost_type,
//         brand: this.detail.brand,
//         model: this.detail.model,
//         vehicle_color: this.detail.vehicle_color,
//         license: this.detail.license,
//         vehicle_type: this.detail.vehicle_type,
//       });
//       console.log(this.editDetailFormGroup.getRawValue());

//     }

//     switch (this.type) {
//       case 'detail':
//         console.log('🔍', this.type);

//         break;

//       case 'create':
//         console.log('⬆️', this.type);

//         break;

//       case 'edit':
//         // console.log('✏️', this.type);
//         // console.log('event-detail 📝: ', this.editDetailFormGroup.getRawValue());
//         // this._eventService.vehicleListData.subscribe((result: any) => {
//         //   this.vehicleList = result.data;
//         //   console.log('🚗🚜🚕', this.vehicleList);
//         //   console.log('filter: ', this.vehicleList.filter((v: any) => this.eventDetail.vehicle_id == v.vehicle_id));
//         //   let vehicleFilterd = this.vehicleList.filter((v: any) => this.eventDetail.vehicle_id == v.vehicle_id)[0]
//         //   this.editDetailFormGroup.get('vehicle_selected_obj')?.setValue(vehicleFilterd)
//         //   // set = รับเต็มจำนวน
//         //   if (this.eventDetail.seats == vehicleFilterd.seats) {
//         //     this.editDetailFormGroup.get('seat_type')?.setValue(0)
//         //   } else { // จำกัดจำนวน
//         //     this.editDetailFormGroup.get('seat_type')?.setValue(1)
//         //     this.editDetailFormGroup.get('seats')?.setValue(this.eventDetail.seats)
//         //   }
//         //   this._changeDetectorRef.markForCheck();
//         // });




//         break;


//     }



//   }

//   // getVehicle(id: any) {
//   //   this._eventService.getVehicle(id).subscribe((result: any) => {
//   //     this.vehicleList = result.data;
//   //     console.log('🚗🚜🚕', this.vehicleList);
//   //     window.alertClose()
//   //     this._changeDetectorRef.markForCheck();
//   //     return this.vehicleList
//   //   });
//   // }

//   ngOnChanges(changes: SimpleChanges): void {
//     console.log('changes: ', changes);
//     // this.eventDetail = changes.detail.currentValue;
//     if (changes['detail']?.currentValue) {
//       this.eventDetail = changes['detail'].currentValue;
//       this._changeDetectorRef.markForCheck();
//     }
//   }
//   edit(id: any) {
//     this._router.navigate(['/event/edit', id])
//   }


//   onEventEmit(data: any) {
//     this.editDetailFormGroup.patchValue(data)
//   }


//   // onUploadImg(event: any) {
//   //   const reader = new FileReader();
//   //   console.log(event.target.files[0]);
//   //   const [file] = event.target.files;
//   //   reader.readAsDataURL(file);
//   //   this.ocr(event.target.files[0])
//   // }

//   // เพื่อดักไม่ให้พิมพ์ได้
//   preventInput(event: any) {
//     event.preventDefault();
//   }

//   // //validator only input number
//   // numberOnly(event: any, type: string = '') {
//   //   const enteredValue = event.target.value + event.key;
//   //   console.log('enter: ', enteredValue);
//   //   // Check if the pressed key is a number (0-9)
//   //   const isNumberKey = /^[0-9]$/.test(event.key);
//   //   console.log('isNumberKey: ', isNumberKey);

//   //   const charCode = (event.which) ? event.which : event.keyCode;
//   //   const isStartZero: boolean = (enteredValue.length === 1 && enteredValue === '0') //ดักเมื่อพิมพ์เริ่มต้นด้วย 0
//   //   switch (type) {
//   //     case 'costs':
//   //       if (!isNumberKey || isStartZero || (charCode > 31 && (charCode < 48 || charCode > 57))) {
//   //         event.preventDefault();
//   //       }
//   //       break;

//   //     default:
//   //       const maxAllowedValue = this.editDetailFormGroup.get('vehicle_selected_obj')?.value.seats;
//   //       const isMoreThanMax: boolean = (parseInt(enteredValue, 10) > maxAllowedValue) // ดักว่าพิมพ์เลขเกิน maximum-seats โดย default
//   //       if (!isNumberKey || isStartZero || isMoreThanMax) {
//   //         console.log('prevent');

//   //         event.preventDefault();
//   //       }
//   //       break;
//   //   }
//   // }

//   // onInputNumberOnly(event: Event, type: string = ''): void {
//   //   const inputElement = event.target as HTMLInputElement;
//   //   let newValue: any = inputElement.value.replace(/[^0-9]/g, '');
//   //   // Remove leading zeros
//   //   newValue = newValue.replace(/^0+/, '');

//   //   if (type == 'seats') {
//   //     // // Check if the value exceeds the maximum allowed value
//   //     // const numericValue = Number(newValue);
//   //     // const maxAllowedValue = this.editDetailFormGroup.get('vehicle_selected_obj')?.value.seats;
//   //     // console.log('full-val: ', newValue);
//   //     // console.log('last-char:', newValue.substring(newValue.length - 1))
//   //     // if (numericValue > maxAllowedValue) {
//   //     //   newValue = maxAllowedValue.toString(); // Remove the last character
//   //     // }
//   //     // // set เป็นลำดับท้าย เพื่อให้ form รับค่านี้จริง
//   //     // this.editDetailFormGroup.get('seats')?.setValue(newValue ? parseInt(newValue) : null)
//   //   } else {
//   //     this.editDetailFormGroup.get('costs')?.setValue(newValue ? parseInt(newValue) : null)
//   //   }

//   //   // มันจะแสดงผลแค่บน client แต่ใน form จะไม่เป็นไปตามที่เห็นเสมอไป จึงต้องเอา newValue ไป set ใน form (ดูข้างบน)
//   //   inputElement.value = newValue;
//   // }

//   // setFormatDate(event: MatDatepickerInputEvent<Date>) {
//   setFormatDate(event: MatDatepickerInputEvent<Date>) {
//     console.log('event: ', event);
//     if (event.value) {
//       this.dateValue = moment(moment(event.value, 'YYYY-MM-DD')).format('YYYY-MM-DD HH:mm');
//     } else {
//       this.dateValue = event.value;
//     }
//     this.editDetailFormGroup?.get('departure_time')?.setValue(this.dateValue);
//   }

//   deleteEvent(eventId: string) {
//     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
//       autoFocus: false,
//       width: '100%',
//       data: 'delete-event'
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('confirm-result: ', result);
//       if (result == true) {
//         window.alertLoading();
//         this._eventService.deleteEvent(eventId).pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
//           console.log('delete-event: ', result);
//           if (result.response_desc === "success") {
//             // window.alertSuccess();
//             this._router.navigate(['/home']);
//           } else {
//             window.alertFail("ไม่สามารถลบได้ กรุณาลองใหม่อีกครั้ง");
//           }
//         });
//       }
//     });
//   }
//   cancel() {
//     if (this.type == 'edit') {
//       this._router.navigate(['/event/detail', this.eventId])
//     } else {
//       this._router.navigate(['/home'])
//     }

//   }
//   save() {
//     const params = this.editDetailFormGroup.value;
//     if (params.seats < 1) {
//       window.alertFail("จำนวนที่นั่งต้องมากกว่า 0");
//       return;
//     }
//     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
//       autoFocus: false,
//       width: '100%',
//       data: 'edit-event'
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('confirm-result: ', result);
//       if (result == true) {
//         const params = this.editDetailFormGroup.value;
//         console.log('params: ', params);
//         this._eventService.update(this.eventId, params).pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
//           console.log('update-event: ', result);
//           if (result.response_desc === "success") {
//             window.alertSuccess();
//             this._changeDetectorRef.markForCheck();
//             this._router.navigate(['/event/detail', this.eventId])
//           } else {
//             window.alertFail("ไม่สามารถบันทึกได้ กรุณาลองใหม่อีกครั้ง");
//           }
//         });
//       }
//     });
//   }
//   create() {
//     console.log(this.editDetailFormGroup.getRawValue());

//     const params = this.editDetailFormGroup.value;
//     if (params.seats < 1) {
//       window.alertFail("จำนวนที่นั่งต้องมากกว่า 0");
//       return;
//     }
//     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
//       autoFocus: false,
//       width: '100%',
//       data: 'create-event'
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('confirm-result: ', result);
//       if (result == true) {
//         window.alertLoading()
//         const params = this.editDetailFormGroup.getRawValue();
//         console.log('params: ', params);
//         this._eventService.createEvent(params).pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
//           console.log('create-event: ', result);
//           if (result.response_desc === "success") {
//             window.alertSuccess();
//             this._changeDetectorRef.markForCheck();
//             this._router.navigate(['/home'])
//           } else {
//             window.alertFail("ไม่สามารถบันทึกได้ กรุณาลองใหม่อีกครั้ง");
//           }
//         }, (e) => {
//           console.log(e);
//           window.alertFail(e.error.response_desc)
//         })
//       }
//     });
//   }


//   handleSearchInput() {
//     let inputElement = this.editDetailFormGroup.get('start_point')?.value
//     console.log(inputElement);

//     var suggestElement = inputElement.nextElementSibling;

//     if (inputElement.length < 2) {
//       suggestElement.style.display = 'none';
//       return;
//     }

//     maps.Search.suggest(inputElement.value, {
//       area: 10
//     });

//     suggestElement.style.display = 'flex';
//   }

//   // google-map function
//   ngAfterViewInit() {
//     if (this.type != 'detail') {

//       this.ngZone.runOutsideAngular(() => {
//         //ต้นทาง
//         this.startPlaceAutocomplete = new google.maps.places.Autocomplete(
//           this.startField?.nativeElement
//         );
//         this.startPlaceAutocomplete.addListener('place_changed', () => {
//           const place = this.startPlaceAutocomplete?.getPlace();
//           let startResult: PlaceSearchResult
//           console.log('ต้นทางหา location เจอหรือไม่: ', place?.geometry?.location ? true : false);
//           startResult = {
//             address: this.startField.nativeElement.value,
//             name: place?.name,
//             location: place?.geometry?.location,
//           };
//           this.fromValue = startResult
//           // เช็คหาก dest_name ไม่มี -> toValue จะถูก set = null
//           // เนื่องจาก name ใช้วัดว่า ถูก select dropdown location แล้วจริง
//           // หากเข้าเงื่อนไขนี้ การคำนวณ distance จะไม่ทำงาน 
//           if (!this.editDetailFormGroup.get('dest_name')?.value) {
//             this.toValue = null
//           }
//           this.ngZone.run(() => {
//             console.log('start-point', startResult);
//             this.editDetailFormGroup.get('start_point')?.setValue(startResult.address)
//             this.editDetailFormGroup.get('start_name')?.setValue(startResult.name)
//             console.log('form-startpoint: ', this.editDetailFormGroup.get('start_point')?.value);
//             if (this.editDetailFormGroup.get('cost_type')?.value == 2) {
//               this.controlCostSuggest()
//             }
//             // this.placeChanged.emit(result);
//             // if (place?.geometry?.location) {
//             //   this.fromValue = startResult
//             // }
//           });
//         });

//         //ปลายทาง
//         this.destPlaceAutocomplete = new google.maps.places.Autocomplete(
//           this.destField?.nativeElement,
//         );
//         this.destPlaceAutocomplete.addListener('place_changed', () => {
//           const place = this.destPlaceAutocomplete?.getPlace();
//           let destResult: PlaceSearchResult
//           console.log('ปลายทางหา location เจอหรือไม่: ', place?.geometry?.location ? true : false);
//           destResult = {
//             address: this.destField.nativeElement.value,
//             name: place?.name,
//             location: place?.geometry?.location,
//           };
//           this.toValue = destResult
//           // เช็คหาก start_name ไม่มี -> fromValue จะถูก set = null
//           // เนื่องจาก name ใช้วัดว่า ถูก select dropdown location แล้วจริง
//           // หากเข้าเงื่อนไขนี้ การคำนวณ distance จะไม่ทำงาน 
//           if (!this.editDetailFormGroup.get('start_name')?.value) {
//             this.fromValue = null
//           }
//           this.ngZone.run(() => {
//             console.log('dest-point', destResult);
//             this.editDetailFormGroup.get('dest_point')?.setValue(destResult.address)
//             this.editDetailFormGroup.get('dest_name')?.setValue(destResult.name)
//             console.log('form-destpoint: ', this.editDetailFormGroup.get('dest_point')?.value);
//             if (this.editDetailFormGroup.get('cost_type')?.value == 2) {
//               this.controlCostSuggest()
//             }
//             // if (place?.geometry?.location) {
//             //   this.toValue = destResult
//             // }
//           });
//         });
//       })
//     }
//   }

//   controlCostSuggest() {
//     if (
//       this.editDetailFormGroup.get('dest_point')?.value && this.editDetailFormGroup.get('start_point')?.value) {
//       console.log('ยังได้ distance = ค่าโดยสารแนะนำทำงาน');
//     } else {
//       this.editDetailFormGroup.get('cost_type')?.reset()
//     }
//   }

//   distanceFromMap(distance: any) {
//     console.log(this.editDetailFormGroup.getRawValue());
//     console.log('Distance: ', distance);
//     this.editDetailFormGroup.get('distance')?.setValue(distance)
//   }


//   // vehicle-Selected-function
//   vehicleSelected(vehicle: any) {
//     console.log('vehicle-selected: ', vehicle);
//     this.editDetailFormGroup.get('vehicle_selected_obj')?.setValue(vehicle)
//     this.editDetailFormGroup.get('seat_type')?.setValue(0)
//     this.editDetailFormGroup.get('vehicle_id')?.setValue(vehicle.vehicle_id)
//   }

//   go(path: string) {
//     this._appComponent.go(path)
//   }
// }