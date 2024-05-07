import { Location } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ThreadService } from "./thread.service";
import { Subject, takeUntil } from "rxjs";
import { GetExtraDataService } from "src/services/get-extra-data/GetExtraData.service";
import { unAuthorizeMessage } from "src/environment-variables/variables.service";
declare var window: any;

@Component({
    selector: 'thread',
    templateUrl: './thread.component.html',
    // encapsulation: ViewEncapsulation.None,
    // styleUrls: ['/src/components/event-detail/event-detail.component.scss'],
})
export class ThreadComponent implements OnInit {

    //Get type from home component
    // @Input() type: string | undefined;
    // @ViewChild('eventForm', { static: true }) eventForm: NgForm | undefined;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    url: string = ''

    threadList: any
    members: any;
    friendtype: any | undefined;
    mutalfriend: any | undefined;
    // private _unsubscribeAll: Subject<any> = new Subject<any>();
    datePipe: any;
    eventId: any;
    isSuccess: boolean = false;
    cookie: any;
    // role:any;
    userId: any;
    vehicle: any;

    pagination: any

    checkAuthorize: boolean = true
    /**
         * Constructor
         *
         * @param {HttpClient} _httpClient
         */
    constructor(
        // private _eventService: EventDetalService,
        private _threadService: ThreadService,
        private _getExtraDataService: GetExtraDataService,
        // private _userService: SigninService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private route: ActivatedRoute,
        private cookieService: CookieService,
        private location: Location,
    ) { }



    ngOnInit() {
        if (this.cookieService.get('user') != '') {
            this.cookie = JSON.parse(this.cookieService.get('user'));
            this.userId = this.cookie.user_id;
            this.url = this._getExtraDataService.getCurrentUrl()
            console.log(this.url);
            switch (this.url) {
                // case นี้สำหรับ threadList ให้ driver เห็น
                case '/threads':
                    // ไม่อนุญาต passenger เข้าถึงหน้านี้
                    if (this.cookie.role_id == 1) {
                        this.checkAuthorize = false
                        window.alertFail(unAuthorizeMessage.val).then(() => {
                            this._router.navigate(['/'])
                        })
                        this._changeDetectorRef.markForCheck()
                        return
                    }
                    console.log('threads-list สำหรับ driver');
                    this._threadService.threadListData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
                        window.alertClose()
                        // console.log('event-lists-test: ', result);
                        this.threadList = result.data
                        this.pagination = result.pagination
                        if (result.data.length > 0) {
                            // console.log('friendtype: ', this.friendtype);
                            this.threadList.forEach((event: any) => {
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
                                // event.profile_img_path = event.profile_img_path ? event.profile_img_path : '/assets/avatars/nopath.png';
                            });
                        }
                        this._changeDetectorRef.markForCheck();
                        // console.log('event-lists: ', this.eventList);
                    })
                    break;

                default:
                    // ถ้าไม่ใช่ passenger จะเข้าใช้งานอันนี้ไม่ได้
                    if (this.cookie.role_id != 1) {
                        this.checkAuthorize = false
                        window.alertFail(unAuthorizeMessage.val).then(() => {
                            this._router.navigate(['/'])
                        })
                        this._changeDetectorRef.markForCheck()
                        return
                    }
                    this._threadService.pasEventListData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
                        window.alertClose()
                        // console.log('event-lists-test: ', result);
                        this.threadList = result.data
                        if (result.data.length > 0) {
                            // console.log('friendtype: ', this.friendtype);
                            this.threadList.forEach((event: any) => {
                                // if (event.isThisFriend == true) {
                                //   event.friendtype = 'friend'
                                // } else if (event.mutualFriend != null) {
                                //   event.friendtype = 'mutualfriend'
                                //   event.mutalfriend = event.mutualFriend.length
                                // } else {
                                //   event.friendtype = null
                                // }

                                let departure_time = new Date(event.departure_time);
                                let current_time = new Date();
                                let time = departure_time.getTime() - current_time.getTime();
                                event.hour = Math.floor(time / 3600000);
                                event.minute = Math.floor((time % 3600000) / 60000);
                                if (event.hour < 0 || event.minute < 0) {
                                    event.timeLeft = 'Expired'
                                }
                                // event.profile_img_path = event.profile_img_path ? event.profile_img_path : '/assets/avatars/nopath.png';
                            });
                        }
                        this._changeDetectorRef.markForCheck();
                        // console.log('event-lists: ', this.eventList);
                    })
                    break;
            }
        }
    }


}