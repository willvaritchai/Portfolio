import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { eventListService } from './event-list.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SigninService } from '../home/sign-in.service';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';
import { MatChipsModule } from '@angular/material/chips';
import { ThreadService } from '../pas-event/thread/thread.service';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';
import { enumFriendStatus } from 'src/environment-variables/variables.service';

declare var window: any
@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {

  verifiedUserMessage = "ได้รับการยืนยันการเป็นผู้ขับขี่แล้ว"


  //Get type from home component
  @Input() type: string | undefined;
  @Input() threadList: any | undefined;
  @Input() paginationInput: any | undefined;
  @Input() checkAuthorize: boolean = true;
  @Output() eListOutput: EventEmitter<any> = new EventEmitter<any>();
  // @ViewChild('eventForm', { static: true }) eventForm: NgForm | undefined;
  url: any
  public eventList: any[] = [];
  public friendtype: any | undefined;
  public mutalfriend: any | undefined;
  //    eventListMock = [
  //   {
  //     user: 'User 1',
  //     friend: 'Friend 1',
  //     rating: 4.8,
  //     total: 50,
  //     name: 'Event 1',
  //     startlocation: 'ศุนย์ปฏิบัติการพัฒนาหุ่นยนต์',
  //     endlocation: 'Westerhaar-Vriezenveensewijk',
  //     seat: 4,
  //     price: 20,
  //     timeLeft: '1h',
  //     status: 'Pending',
  //     faculty: 'IT',
  //   },
  //   {
  //     user: 'User 2',
  //     friend: 'Friend 2',
  //     rating: 4.8,
  //     total: 50,
  //     name: 'test',
  //     startlocation: 'ศูนย์ปฎิบัติการพัฒนาหุ่นยนต์คนเหล็กชายสี่',
  //     endlocation: 'Central Rama 1+1=2',
  //     seat: 6000,
  //     price: 20,
  //     timeLeft: 'อีก 12 นาที พี่ไปรับนะจ๊ะะะะะะะะะะ',
  //     status: 'Pending',
  //     faculty: 'ครุศาสตร์อุตสาหกรรมและเทคโนโลยี',
  //   }
  // ];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  datePipe: any;
  userCookie: any;
  userId: any;
  roleId: any;

  isLoading: boolean = false
  isPaginateLoading: boolean = false
  pagination: any
  isPaginateTrigger: boolean = false

  search: string = ''
  filter: string = ''
  /**
       * Constructor
       *
       * @param {HttpClient} _httpClient
       */
  constructor(
    private _eventService: eventListService,
    private _threadService: ThreadService,
    private _getExtraDataService: GetExtraDataService,
    // private _userService: SigninService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private cookieService: CookieService,
    private _appComponent: AppComponent,
    private matChips: MatChipsModule
  ) { }



  ngOnInit() {
    if (this.cookieService.get('user') != '') {
      this.userCookie = JSON.parse(this.cookieService.get('user'));
      this.userId = this.userCookie.user_id;
      this.roleId = this.userCookie.role_id;

      this.filter = 'all'
    }

    const param = { user_id: this.userId };
    switch (this.type) {
      case 'event':
        this.getAllEvent(param)
        break;

      // สำหรับ driver ดู thread-list
      case 'threads':
        this.eventList = this.threadList
        this.pagination = this.paginationInput
        break;

      // passenger ดู thread ของตัวเอง
      case 'thread':
        this.eventList = this.threadList
        break;
    }
  }

  filterChange(filterData: any) {
    console.log('filter: ', filterData);
    this.filter = filterData
    this.searching()
  }

  onSearchValChange(searchVal: any) {
    this.search = searchVal
    this._changeDetectorRef.markForCheck()
  }

  // สำหรับ load page เพิ่ม
  paginationTrigger() {
    this.isPaginateLoading = true
    this.searching()
  }

  searching() {
    const param: any = { search: this.search, filter: this.filter }
    if (this.filter == 'faculty') {
      param.faculty = this.userCookie.faculty_name
    }
    console.log(param);

    // อันนี้คือการ load data จากการเสิช
    if (!this.isPaginateLoading) {
      this.isLoading = true
      this.eventList = []
    } else {
      // เข้า condition นี้ เมื่อ paginate ถูก trigger
      param.step = this.pagination.step + this.pagination.limit
    }

    console.log(param);
    switch (this.type) {
      case 'threads':
        param.my_id = this.userCookie.user_id
        this.getAllThread(param)
        break;

      default:
        this.getAllEvent(param)
        break;
    }
  }

  getAllEvent(param: any) {
    param.user_id = this.userId
    this._eventService.getAllEvent(param).pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      if (!param?.search) {
        window.alertClose()
      }
      console.log('event-lists: ', result);

      let listFromPaginate
      // หากไม่ใช่ load paginate จะเข้าเงื่อนไขแรก
      if (!this.isPaginateLoading) {
        this.eventList = result.data
      } else {
        // หาก load paginate
        listFromPaginate = result.data
      }

      // pagination
      this.pagination = result.pagination
      console.log('pagination: ', this.pagination);

      if (result.data.length > 0) {
        if (!this.isPaginateLoading) {
          this.eventList.forEach((event: any) => {
            if (event.isThisFriend == true) {
              event.friendtype = 'friend'
            } else if (event.count_mutual) {
              event.friendtype = 'mutualfriend'
              event.mutalfriend = event.count_mutual
            } else {
              event.friendtype = null
            }

            let departure_time = new Date(event.departure_time);
            let current_time = new Date();
            let time = departure_time.getTime() - current_time.getTime();
            event.hour = Math.floor(time / 3600000);
            event.minute = Math.floor((time % 3600000) / 60000);
            if (event.hour <= 0 && event.minute <= 0) {
              event.timeLeft = 'Expired'
            }
          });

        } else {
          listFromPaginate.forEach((event: any) => {
            if (event.isThisFriend == true) {
              event.friendtype = 'friend'
            } else if (event.count_mutual) {
              event.friendtype = 'mutualfriend'
              event.mutalfriend = event.count_mutual
            } else {
              event.friendtype = null
            }

            let departure_time = new Date(event.departure_time);
            let current_time = new Date();
            let time = departure_time.getTime() - current_time.getTime();
            event.hour = Math.floor(time / 3600000);
            event.minute = Math.floor((time % 3600000) / 60000);
            if (event.hour <= 0 && event.minute <= 0) {
              event.timeLeft = 'Expired'
            }
          });

          // ... เป็นการ push object ทั้งหมดใน array มาใส่ทันที
          this.eventList.push(...listFromPaginate)
        }

      }
      if (result.response_code == 200) {
        this.isPaginateLoading = false
        this.isLoading = false
      }

      this._changeDetectorRef.markForCheck();
      console.log('event-lists: ', this.eventList);
      this.eListOutput.emit(this.eventList)
    })
  }

  // สำหรับ search all-threads
  getAllThread(param: any) {
    this._threadService.getAllThreads(param).pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      if (!param?.search) {
        window.alertClose()
      }

      let listFromPaginate
      // หากไม่ใช่ load paginate จะเข้าเงื่อนไขแรก
      if (!this.isPaginateLoading) {
        this.eventList = result.data
      } else {
        // หาก load paginate
        listFromPaginate = result.data
      }

      // pagination
      this.pagination = result.pagination

      if (result.data.length > 0) {
        if (!this.isPaginateLoading) {
          this.eventList.forEach((event: any) => {
            if (event.isThisFriend == true) {
              event.friendtype = 'friend'
            } else if (event.count_mutual) {
              event.friendtype = 'mutualfriend'
              event.mutalfriend = event.count_mutual
            } else {
              event.friendtype = null
            }

            let departure_time = new Date(event.departure_time);
            let current_time = new Date();
            let time = departure_time.getTime() - current_time.getTime();
            event.hour = Math.floor(time / 3600000);
            event.minute = Math.floor((time % 3600000) / 60000);
            if (event.hour < 0 || event.minute < 0) {
              event.timeLeft = 'Expired'
            }
          });
        } else {
          listFromPaginate.forEach((event: any) => {
            if (event.isThisFriend == true) {
              event.friendtype = 'friend'
            } else if (event.count_mutual) {
              event.friendtype = 'mutualfriend'
              event.mutalfriend = event.count_mutual
            } else {
              event.friendtype = null
            }

            let departure_time = new Date(event.departure_time);
            let current_time = new Date();
            let time = departure_time.getTime() - current_time.getTime();
            event.hour = Math.floor(time / 3600000);
            event.minute = Math.floor((time % 3600000) / 60000);
            if (event.hour < 0 || event.minute < 0) {
              event.timeLeft = 'Expired'
            }
          });
          // ... เป็นการ push object ทั้งหมดใน array มาใส่ทันที
          this.eventList.push(...listFromPaginate)
        }
      }
      if (result.response_code == 200) {
        this.isLoading = false
        this.isPaginateLoading = false
      }

      this._changeDetectorRef.markForCheck();
    })
  }



  // onKeyUp(event: any) {
  //   // console.log(event);
  //   if (event.keyCode == 13) {
  //     this.searching()
  //   }
  // }

  // searching() {
  //   // console.log('search: ', this.search);
  //   const param = { user_id: this.userId, search: this.search };
  //   this.getAllEvent(param)
  // }

  detail(id: any) {
    console.log('event: ', id);
    // this._router.navigate(['/event-detail',id])
    // router link to event-detail/id
    this._router.navigate(['/event/detail', id])
  }
  createEvent() {
    this._router.navigate(['/event/create'])
  }


  // onUploadImg(event: any) {
  //   const reader = new FileReader();
  //   console.log(event.target.files[0]);
  //   const [file] = event.target.files;
  //   reader.readAsDataURL(file);
  //   this.ocr(event.target.files[0])
  // }

  go(url: string, id: any = null) {
    // หาก user ที่กดดูเป็นของเราเอง จะพาไปหน้า acc-detail ตัวเอง
    if (url == '/account/other-profile' && id == this.userCookie.encrypt_id) {
      url = '/account/detail'
      this._appComponent.go(url)
    } else if (url == '/account/other-profile') {
      this._router.navigate([url, id])
    }
    else if (['/thread/detail', '/threads/detail'].includes(url)) {
      this._appComponent.go(url, id)
    } else {
      this._appComponent.go(url)
    }

  }

  goChat(id: any) {
    this._router.navigate(['/chat/event', id]);
  }


}
