import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ChatService } from '../service/chats.service.component';
import { co } from '@fullcalendar/core/internal-common';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/services/FileService.service';
import { SafeUrl } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
declare var window: any;
@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['../chats.component.scss']
})
export class ReviewComponent implements OnInit {
  verifiedUserMessage = "ได้รับการยืนยันการเป็นผู้ขับขี่แล้ว"

  cookie: any;
  userId: any;
  eventId: any;
  encryptEvent: any;
  driverDetail: any;
  currentRating: number = 0;
  fullname: string = '';
  role: any;
  memberId: any;
  checkAuthorize: boolean = false
  constructor(
    private _appComponent: AppComponent,
    private chatService: ChatService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private fileService: FileService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    //for click on event details
    this.encryptEvent = this.route.snapshot.params['id'];
    // let param = {event_id:this.route.snapshot.params['id'], user_id:}
    this._changeDetectorRef.markForCheck();
    if (this.cookieService.get('user') != '') {
      this.cookie = JSON.parse(this.cookieService.get('user'));
      this.userId = this.cookie.user_id;
      this.getEventDriver()
    }

  }

  getEventDriver() {
    let param = { event_id: this.route.snapshot.params['id'], user_id: this.userId }
    this.chatService.getEventDriver(param).subscribe((data: any) => {
      if (data.response_code == 401) {
        this.checkAuthorize = false
        window.alertFail(data.response_desc).then(() => {
          this.router.navigate(['/'])
        })
        return
      } else {
        this.checkAuthorize = true
        console.log('eventDriver', data);
        this.eventId = data.data.event_id
        this.driverDetail = data.data;
        this.fullname = data.data.fullname
        this.role = data.data.role_id
        this.memberId = data.data.member_id
        window.alertClose()
      }
      this._changeDetectorRef.markForCheck();
      // this.chatService.setEventDriver(data);
    });
  }

  reportUser() {
    // console.log(this.currentRating)
    // this.router.navigate(['/report', this.driverDetail.user_id]);
    console.log(this.driverDetail)
    localStorage.setItem('event-report', JSON.stringify(true))
    this.router.navigate(['/report', this.driverDetail.encrypt_id]);
  }
  onRatingUpdated(rating: any): void {
    // Update your property or send the rating to the server, etc.
    this.currentRating = rating.rating;
    console.log('Rating updated:', rating.rating);
  }
  downloadFile() {
    this.fileService.download(`log/${this.eventId}.txt`).subscribe((data: any) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(data);
      a.download = `${this.driverDetail.event_name}.txt`; // Specify the desired file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    });
  }
  skip() {
    let params = { status: 4, user_id: this.userId, event_id: this.eventId, isTriggerBtn: true }
    this.chatService.updateReqest(this.memberId, params).subscribe((data: any) => {
      console.log('eventDriver', data);
      if (data.response_desc === 'success') {
        this.router.navigate(['/chat/review/done', this.encryptEvent]);
      }
      // this.driverDetail = data.data;
      this._changeDetectorRef.markForCheck();
    });
  }
  next() {
    window.alertLoading();
    console.log(this.driverDetail)
    let param = { my_id: this.userId, user_id: this.driverDetail.user_id, rating_point: this.currentRating, event_id: this.eventId, member_id: this.driverDetail.member_id, isTriggerBtn: true }
    this.chatService.ratingDriver(param).subscribe((data: any) => {
      console.log('eventDriver', data);
      // this.driverDetail = data.data;
      if (data.response_desc === 'success') {
        window.alertClose()
        this._changeDetectorRef.markForCheck();
        this.router.navigate(['/chat/review/done', this.encryptEvent]);
      }
    });
  }

  go(url: string, id: any) {
    // window.alertLoading()
    // หาก user ที่กดดูเป็นของเราเอง จะพาไปหน้า acc-detail ตัวเอง
    if (id == this.cookie.encrypt_id) {
      url = '/account/detail'
      this._appComponent.go(url)
    } else {
      this.router.navigate([url, id])
    }


  }
}