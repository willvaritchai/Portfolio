import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ChatService } from '../service/chats.service.component';
import { co } from '@fullcalendar/core/internal-common';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/services/FileService.service';
import { SafeUrl } from '@angular/platform-browser';
declare var window: any;
@Component({
  selector: 'done',
  templateUrl: './done.component.html',
  styleUrls: ['../chats.component.scss']
})
export class DoneComponent implements OnInit {
  cookie: any;
  userId: any;
  eventId: any;
  rawEventId: any;
  driverDetail: any;
  currentRating: number = 0;
  this: any;
  checkAuthorize: boolean = false


  constructor(
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
    this.eventId = this.route.snapshot.params['id'];
    let param = { event_id: this.route.snapshot.params['id'] }
    this._changeDetectorRef.markForCheck();
    if (this.cookieService.get('user') != '') {
      this.cookie = JSON.parse(this.cookieService.get('user'));
      this.userId = this.cookie.user_id;
      this.getEventDriver()
    }
  }
  downloadFile() {
    this.fileService.download(`log/${this.rawEventId}.txt`).subscribe((data: any) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(data);
      a.download = `${this.driverDetail.event_name}.txt`; // Specify the desired file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    });
  }
  home() {
    this.router.navigate(['/home']);
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
        console.log('eventDriver', data);
        this.driverDetail = data.data;
        this.rawEventId = this.driverDetail.event_id
        this.checkAuthorize = true
        window.alertClose()
        // this.chatService.setEventDriver(data);
      }
      this._changeDetectorRef.markForCheck();
    });
  }
}