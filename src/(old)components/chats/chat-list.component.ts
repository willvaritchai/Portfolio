import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ChatService } from './service/chats.service.component';
import { co } from '@fullcalendar/core/internal-common';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DialogConfig } from '@angular/cdk/dialog';
import { EventDetalService } from '../event-detail/event-detail.service';
declare var window: any;
@Component({
  selector: 'chats-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsListComponent implements OnInit {

  roomId: any;
  messageText: any;
  messageArray: { user: string, event: number, message: string, timestamp: Date }[] = [];
  storageArray: any[] = [];
  showScreen = false;
  phone: any;
  currentUser: any;
  selectedUser: any;
  cookie: any;
  userId: any;
  chatList: any;
  roomList: any[] = [];
  roomListOpen: any[] = []
  roomListClose: any[] = [];
  isModalVisible = false;
  eventId: any;
  memberCount: any;
  eventName: any;
  historyChat: any;
  countOnactive: any = 0;
  countClose: any = 0;
  requestList: any[] = [];
  isShow: boolean = false;

  constructor(
    private chatService: ChatService,
    private eventDetalService: EventDetalService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    if (this.cookieService.get('user') != '') {
      this.cookie = JSON.parse(this.cookieService.get('user'));
      this.userId = this.cookie.user_id;
    }
    this.getData();
    // this.chatService.getChatRoom(this.userId).subscribe((data: any) => {
    //   console.log('roomList: ', data.data);
    //   this.roomList = data.data;
    //   this.roomList.forEach((element: any) => {
    //     if(element.status == 2){
    //       this.countClose = this.countClose + 1;
    //     }else{
    //       this.countOnactive = this.countOnactive + 1;
    //       let params = {user_id: this.userId, event_id: element.event_id}
    //       this.chatService.getRequest(params).subscribe((data: any) => {
    //         console.log('requestList: ', data.data);
    //         this.requestList = data.data;
    //         this.requestList.forEach((request: any) => {
    //           if (request.isThisFriend == true) {
    //             request.friendtype = 'friend'
    //           } else if (request.mutualFriend != null) {
    //             request.friendtype = 'mutualfriend'
    //             request.mutalfriend = request.mutualFriend.length
    //           } else {
    //             request.friendtype = null
    //           }
    //         });
    //       });
    //     }
    //   });
    //   this._changeDetectorRef.markForCheck();
    // });
    // this.chatService.requestListData.pipe().subscribe((data: any) => {
    //   this.requestList = data.data;
    //   console.log('requestList: ', this.requestList);
    // });
  }
  getData() {
    console.log("userId", this.userId)
    this.chatService.getChatRoom(this.userId).subscribe((data: any) => {
      console.log('roomList: ', data.data);
      this.roomListOpen = data.data.filter((e: any) => e.status != 3 && e.reqestStatus != 4)
      this.roomListClose = data.data.filter((e: any) => e.status == 3 || e.reqestStatus == 4)
      console.log('open-list: ', this.roomListOpen);
      console.log('close-list: ', this.roomListClose);

      this.roomList = data.data;
      this.roomList.forEach((element: any) => {
        if (element.status == 2 || element.reqestStatus == 4) {
          this.countClose = this.countClose + 1;
        } else {
          this.countOnactive = this.countOnactive + 1;
          let params = { user_id: this.userId, event_id: element.event_id }
          this.chatService.getRequest(params).subscribe((data: any) => {
            console.log('requestList: ', data.data);
            element.requestList = data.data;
            this.requestList = data.data;
            this.requestList.forEach((request: any) => {
              if (request.isThisFriend == true) {
                request.friendtype = 'friend'
              } else if (request.mutualFriend != null) {
                request.friendtype = 'mutualfriend'
                request.mutalfriend = request.mutualFriend.length
              } else {
                request.friendtype = null
              }
            });
          });
        }
      });
      window.alertClose();
      this._changeDetectorRef.markForCheck();
    });
  }
  goChat(id: any) {
    this.router.navigate(['/chat/event', id]);
  }
  goDetail(id: any) {
    this.router.navigate(['/event/detail', id])
  }

  // events.members_id,events.event_id
  accept(events: any) {
    let params = { status: 1, event_id: events.event_id, seats: events.seats }
    this.chatService.updateReqest(events.members_id, params).subscribe((data: any) => {
      console.log('updateReqest: ', data);
      if (data.response_desc == "success") {
        // join-event เพื่อลด seats
        data.data.seats = data.data.seats - 1
        this.eventDetalService.joinEvent(data.data).subscribe((result: any) => {
          // this.router.navigate(['/chat/event', id]);
          if (result.response_desc == "success") {
            this.getData();
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              autoFocus: false,
              width: '100%',
              // height: '40%',
              data: 'driver-accept'
            });
            dialogRef.afterClosed().subscribe(result => {
              console.log('confirm-result: ', result);
              if (result == true) {
                console.log('accept');
                console.log('events: ', events);
                this.router.navigate(['/chat/event', events.encryptEvent]);
              }
            });
          } else {
            window.alertFail(result.response_desc)
            this._changeDetectorRef.markForCheck()
          }
        })
      }
    });
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   autoFocus: false,
    //   width: '100%',
    //   height: '40%',
    //   data: 'driver-accept'
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('confirm-result: ', result);
    //   if (result == true) {
    //     console.log('accept');
    //     this.router.navigate(['/chat/event', id]);
    //   }
    // });
  }
  denied(id: any) {
    // let params = {status:2}
    // this.chatService.updateReqest(id,params).subscribe((data: any) => {
    //   if(data.response_desc == "success"){}
    // });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      width: '100%',
      // height: '40%',
      data: 'driver-denied'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('confirm-result: ', result);
      if (result?.confirm == true) {
        console.log('denied');
        let params = { status: 2, detail: result.detail }
        if (params.detail == '') {
          params.detail = null;
        }
        console.log("param: ", params)
        this.chatService.updateReqest(id, params).subscribe((data: any) => {
          if (data.response_desc == "success") {
            this.getData();
          }
        });
        // this.router.navigate(['/chat/event', id]);
      }
    });
  }
  cancel(id: any) {
    console.log("id", id)
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      width: '100%',
      // height: '40%',
      data: 'cancel-request'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('confirm-result: ', result);
      if (result === true) {
        console.log('cancel');
        this.chatService.cancelReqest(id).subscribe((result: any) => {
          console.log('cancel-result: ', result);
          if (result.response_desc == "success") {
            this.getData();
          }
        });
      }
    });
  }
  // seeDetails(id:any){
  //   // this.router.navigate(['/event/detail',id])
  //   let params = {user_id:this.userId,members_id:id}
  //   let detail:any[] = [];
  //   this.chatService.getDeniedDetail(params).subscribe((data: any) => {
  //     console.log('getDeniedDetail: ', data.data);
  //       detail = data.data;
  //       detail.forEach((element: any) => {
  //       if(element.isThisFriend == true){
  //         element.friendtype = 'friend'
  //       }else if(element.mutualFriend != null){
  //         element.friendtype = 'mutualfriend'
  //         element.mutalfriend = element.mutualFriend.length
  //       }else{
  //         element.friendtype = null
  //       }
  //     });
  //     this._changeDetectorRef.markForCheck();
  //   });
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     autoFocus: false,
  //     width: '100%',
  //     // height: '40%',
  //     // data: 'denied-detail'
  //     data: {receivedData:'denied-detail',dialogData:detail[0],userId:this.userId}
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('confirm-result: ', result);
  //     if (result.confirm == true) {
  //       console.log('cancel');
  //     }
  //   });
  // }
  show() {
    this.isShow = !this.isShow;
    console.log(this.isShow);
    this._changeDetectorRef.markForCheck();
  }
  seeDetails(id: any) {
    let params = { user_id: this.userId, members_id: id };
    let detail: any[] = [];

    this.chatService.getDeniedDetail(params).subscribe((data: any) => {
      console.log('getDeniedDetail: ', data.data);
      detail = data.data;

      detail.forEach((element: any) => {
        if (element.isThisFriend == true) {
          element.friendtype = 'friend';
        } else if (element.mutualFriend != null) {
          element.friendtype = 'mutualfriend';
          element.mutalfriend = element.mutualFriend.length;
        } else {
          element.friendtype = null;
        }
      });

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        autoFocus: false,
        width: '100%',
        height: 'fit-content',
        data: {
          receivedData: 'denied-detail',
          dialogData: detail[0],
          userId: this.userId
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('confirm-result: ', result);
        if (result == true) {
          console.log('cancel');
          let param = { status: 3, detail: data.data.detail }
          this.chatService.updateReqest(id, param).subscribe((data: any) => {
            console.log('updateReqest: ', data);
            if (data.response_desc == "success") {
              this.getData();
            }
          });
        }
      });
    });
  }

  goOther(id: any) {
    this.router.navigate(['/account/other-profile', id])
  }
}