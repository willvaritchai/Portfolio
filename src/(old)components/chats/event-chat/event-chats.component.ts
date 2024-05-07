import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ChatService } from '../service/chats.service.component';
import { co } from '@fullcalendar/core/internal-common';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/services/FileService.service';
import { SafeUrl } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import * as moment from 'moment-timezone';

declare var window: any

@Component({
  selector: 'chats',
  templateUrl: './event-chats.component.html',
  styleUrls: ['../chats.component.scss']
})
export class ChatsComponent implements OnInit, AfterViewInit {
  @ViewChild('containerElement') containerElement?: ElementRef;
  @ViewChild('popup', { static: false }) popup: any;
  fileUrl: SafeUrl | undefined;
  // port = process.env['PORT'] || 3000;

  roomId: any;
  messageText: any;
  messageArray: { user_id: number, download_url: string, user: string, event: number, message: string, timestamp: Date }[] = [];
  storageArray: any[] = [];
  showScreen = false;
  phone: any;
  currentUser: any;
  selectedUser: any;
  cookie: any;
  userId: any;
  ownerId: any
  chatList: any;
  roomList: any;
  isModalVisible = false;
  eventId: any;
  encryptEvent: any;
  memberCount: any = 0;
  eventName: any;
  isOwner: boolean = false;
  chatId: any;
  // today: any = new Date().toISOString().slice(0, 10);
  status: any = 0;
  member_id: any;
  eventStatus: any = 0;
  isOwnerLeft: boolean = false
  isReview: boolean = false

  startCheck: boolean = false
    // toDay: any = new Date().toISOString().slice(0, 10)
    ;

  previousLength = 0;

  checkAuthorize: boolean = true
  constructor(
    private chatService: ChatService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private fileService: FileService,
    private router: Router,
    private _appComponent: AppComponent
  ) {
  }

  ngOnInit(): void {
    // this.selectedUser = this.chatList.find((chat: any) => chat.user_id === this.userId);
    // this.selectUserHandler()
    //for click on event details
    this.chatService.roomMemberListData.subscribe((data: any) => {
      if (data.response_code == 401) {
        this.checkAuthorize = false
        window.alertFail(data.response_desc).then(() => {
          this.router.navigate(['/'])
        })
        return
      }
      console.log('first');

      let memList = data.data
      this.ownerId = memList[0].owner
      this.eventId = memList[0].event_id
    })
    this.encryptEvent = this.route.snapshot.params['id'];
    this._changeDetectorRef.markForCheck();
    if (this.cookieService.get('user') != '') {
      this.cookie = JSON.parse(this.cookieService.get('user'));
      this.userId = this.cookie.user_id;
    }

    //normal flow
    if (this.eventId == null || undefined) {
      this.chatService.getChatRoom(this.userId).subscribe((data: any) => {
        console.log('data: ', data);
        this.chatList = data.data;
        this.selectedUser = data.data.find((chat: any) => chat.user_id === this.userId);
        this._changeDetectorRef.markForCheck();
      });
      //id flow
    } else {
      this.chatService.roomMemberListData.subscribe((data: any) => {
        if (!this.startCheck) {
          // this.chatService.getChatRoomMember(this.eventId).subscribe((data: any) => {
          // console.log('data chat: ', data);
          this.chatList = data.data;
          // this.memberCount = this.chatList.length;
          this.eventName = this.chatList[0].event_name;
          this.chatId = this.chatList[0].event_id;
          this.chatList.forEach((element: any) => {
            if (this.userId == element.user_id) {
              this.status = element.reqStatus;
              this.eventStatus = element.status;
              this.member_id = element.members_id;
              this.isOwnerLeft = element.isOwnerLeft
              this.isReview = element.is_review
              if (this.userId == element.owner) {
                this.isOwner = true;
              }
            }
            // if (this.userId == element.owner) {
            //   this.isOwner = true;
            //   console.log('status: ', element.status);
            //   this.status = element.status;
            //   this.member_id = element.members_id;
            //   this._changeDetectorRef.markForCheck();
            // }
            // else {
            //   if (this.userId == element.user_id) {
            //     this.status = element.status;
            //     this.member_id = element.members_id;
            //   }
            // }
          });
          this.chatList.forEach((element: any) => {
            if (element.reqStatus == 1) {
              this.memberCount = this.memberCount + 1;
            }
          });
          console.log('isOwner: ', this.isOwner);
          console.log('status: ', this.status);
          console.log('eventStatus: ', this.eventStatus);
          console.log('member of this event-chat: ', this.chatList);
          console.log('this.member_id: ', this.member_id);
          this.selectedUser = data.data.find((chat: any) => chat.user_id === this.userId);
          this.selectUserHandler()
          this._changeDetectorRef.markForCheck();

          // old-condition
          // if (this.eventStatus == 3 && this.status != 4) {
          //   this.goToReview()
          // }

          // ! condition มี (left-side) && (right-side)
          // ○ left-side: หากพบว่า owner ออกกลุ่มไปแล้ว หรือ status member ของเราเป็น 4(สำหรับเช็ค case ที่ member ออกกลุ่มไปก่อน) >>> [true]
          // ○ เชื่อม center condition ด้วย &&
          // ○ right-side: หากพบว่า "ค่า isReview ของเราไม่เท่ากับ null (เพื่อเช็คว่าเราเป็น member, ไม่ใช่ owner) และ เรายังไม่ได้ทำการ review" >>> [true]
          // ○ สรุปคือ:: เมื่อพบว่า owner ออกกลุ่มไปแล้ว หรือเราออกกลุ่มไปก่อน โดยที่ เรานั้นต้องเป็น member ธรรมดา (not owner) และยังไม่ได้ review >>> บังคับไปหน้า review
          if ((this.isOwnerLeft || this.status == 4) && (this.isReview != null && this.isReview == false)) {
            this.goToReview()
          }
        } else {
          this.startCheck = false
        }
      });

      this.chatService.getChatRoom(this.userId).subscribe((data: any) => {
        console.log('event: ', data.data);
        this.roomList = data.data;
        this._changeDetectorRef.markForCheck();
      });
    }

    let url = 'https://capstone23.sit.kmutt.ac.th/un2/chat-server';
    // let url = 'http://localhost:3000';
    let fileUrl = `${url}/log/${this.eventId}.txt`;
    //find file url
    fetch(fileUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Get the text content of the file
      })
      .then(text => {
        const formattedMessages = this.parseTextContent(text);
        console.log('Formatted messages:', formattedMessages);
        // Do something with the text content here
        // this.messageArray.push(formattedMessages);
        this.messageArray = formattedMessages;
        setTimeout(() => {
          if (this.messageArray.length >= 4) {
            this.scrollToBottom();
          }
        }, 0);
        this._changeDetectorRef.markForCheck();
        console.log('this.messageArray: ', this.messageArray);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    this.chatService.getMessage().subscribe((data: { user_id: number, download_url: string, user: string, event: number, message: string, timestamp: Date }) => {
      // this.storageArray = this.chatService.getStorage();
      console.log('chat data: ', data);
      // const today = new Date();
      // const oldDate = new Date(data.timestamp);
      // const utc7 = new Date(oldDate.valueOf() - 7 * 60 * 60 * 1000);
      // console.log('correct-timestamp (utc7): ', utc7);
      // console.log('bug date: ', oldDate);


      const timestamp = data.timestamp
      if (!(timestamp instanceof Date)) {
        // Parse the timestamp using moment.js and set the timezone to your desired timezone
        const date = new Date(timestamp);
        const customTimestamp = date.toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
        console.log('before custom: ', timestamp);
        console.log('custom: ', new Date(customTimestamp));
        data.timestamp = new Date(customTimestamp)
      }

      // data.timestamp = new Date(utc7);

      // if (oldDate.getHours() > utc7.getHours()) {
      //   // console.log('today>oldDate');
      //   console.log('correct');
      //   data.timestamp = new Date(utc7);
      // } 
      // else {
      //   console.log('bug');
      //   data.timestamp = new Date(data.timestamp);
      // }

      // // Convert the timestamp to ISO 8601 format
      // data.timestamp = new Date(utc7);
      // console.log('this.storageArray: ', this.storageArray);
      // const messageData = data
      if (data.event == this.eventId) {
        this.messageArray.push(data);
        setTimeout(() => {
          if (this.messageArray.length >= 4) {
            this.scrollToBottom();
          }
        }, 0);
      }
      console.log('เช็คว่า data ที่เข้ามา เป็นของ event เดียวกันหรือไม่: ', data.event == this.eventId);
      // if (data.event == this.eventId) {

      //   if (data) {
      // let url = 'https://capstone23.sit.kmutt.ac.th/un2/chat-server';
      // let fileUrl = `${url}/log/${this.chatId}.txt`;
      // //find file url
      // fetch(fileUrl)
      //   .then(response => {
      //     if (!response.ok) {
      //       throw new Error('Network response was not ok');
      //     }
      //     return response.text(); // Get the text content of the file
      //   })
      //   .then(text => {
      //     const formattedMessages = this.parseTextContent(text);
      //     console.log('Formatted messages:', formattedMessages);
      //     // Do something with the text content here
      //     // this.messageArray.push(formattedMessages);
      //     this.messageArray = formattedMessages;
      //     console.log('this.messageArray: ', this.messageArray);
      //   })
      //   .catch(error => {
      //     console.error('There was a problem with the fetch operation:', error);
      //   });



      // this.storageArray = this.chatService.getStorage();
      // const storeIndex = this.storageArray.findIndex((storage) => storage.event === this.eventId);
      // console.log('storeIndex: ', storeIndex);
      // console.log('data before push: ', data);
      // console.log('this.storageArray(before): ', this.storageArray);
      // if (storeIndex > -1) {
      //   this.storageArray[storeIndex].chats = this.messageArray
      //   console.log('chats-byStoreIndex: ', this.storageArray[storeIndex].chats);
      //   console.log('this.storageArray(after): ', this.storageArray);
      //   this.chatService.setStorage(this.storageArray);

      // } else {
      //   console.log('storage-array empty (ผู้รับ message ที่ 1 จะเจอเหตุการณ์นี้ ?');
      //   console.log(storeIndex);

      //   console.log('ฝั่งผู้รับคนแรก(storageArray):', this.storageArray);
      //   const updateStorage = {
      //     event: this.eventId,
      //     chats: this.messageArray
      //   };
      //   this.storageArray.push(updateStorage);
      //   this.chatService.setStorage(this.storageArray);
      // }

    }



      // console.log('this.messageArray: ', this.messageArray);


      // if (this.eventId) {
      //   console.log('eventId?');

      //   setTimeout(() => {
      //     this.storageArray = this.chatService.getStorage();
      //     const storeIndex = this.storageArray.findIndex((storage) => storage.event === this.eventId);
      //     console.log('storeIndex: ', storeIndex);
      //     this.messageArray = storeIndex > -1 ? this.storageArray[storeIndex].chats : [];
      //   }, 500);
      // }
      // }

      // }
    );

  }

  scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
  }

  ngAfterViewInit(): void {
    this.openPopup();
  }

  openPopup(): void {
    this.openModal();
  }

  selectUserHandler(): void {
    // this.selectedUser = this.chatList.find((chat: any) => chat.user_id === this.userId);
    this.messageArray = [];

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray.findIndex((storage) => storage.event === this.eventId);

    if (storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }
    this.join(this.selectedUser.fullname, this.eventId); //เก็บไว้ก่อน
  }

  join(username: string, eventId: string): void {
    this.chatService.joinRoom({ user: username, event: eventId });
  }

  sendMessage(): void {
    const today = new Date();
    const utc7 = new Date(today.valueOf() + 7 * 60 * 60 * 1000).toISOString();
    let messageLength = this.messageText.trim().length
    console.log("sendMessage-length: ", messageLength);
    // if (this.status == 1 || this.messageText.trim().length > 0 || this.messageText.trim().length != 0 || this.messageText != undefined) {
    if (this.status == 1 && messageLength > 0 && messageLength != 0 && this.messageText != undefined) {
      console.log('this.currentUser: ', this.currentUser);
      console.log('this.selectedUser: ', this.selectedUser);
      this.chatService.sendMessage({
        user_id: this.selectedUser.user_id,
        user: this.selectedUser.fullname,
        event: this.selectedUser.event_id,
        event_name: this.eventName,
        message: this.messageText,
        timestamp: utc7,
        download_url: this.selectedUser.download_url,
      });

      // this.storageArray = this.chatService.getStorage();
      // const storeIndex = this.storageArray.findIndex((storage) => storage.event === this.selectedUser.event_id);

      // if (storeIndex > -1) {
      //   this.storageArray[storeIndex].chats.push({
      //     user: this.selectedUser.fullname,
      //     message: this.messageText,
      //     timestamp: new Date()
      //   });
      // } else {
      //   const updateStorage = {
      //     event: this.selectedUser.event_id,
      //     chats: [{
      //       user: this.selectedUser.fullname,
      //       message: this.messageText,
      //       timestamp: new Date()
      //     }]
      //   };

      //   this.storageArray.push(updateStorage);
      // }

      // this.chatService.setStorage(this.storageArray);
    }
    this.messageText = '';
    this._changeDetectorRef.markForCheck();
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  dismissModal(): void {
    this.isModalVisible = false;
  }

  messages: any = [
    { sender: 'User 1', content: 'Hello there!' },
    { sender: 'User 2', content: 'Hi! How can I help you?' },
    // Add more messages as needed
  ];
  getMessageStyles(content: string) {
    const textLength = content.length;
    let backgroundColor = '#e2e8f0'; // Default background color
    let padding = '8px'; // Default padding
    let margin_right = '8px'; // Default padding

    if (textLength > 20) {
      backgroundColor = 'blue'; // Change background color if text length is greater than 20
      padding = '16px'; // Change padding if text length is greater than 20
      margin_right = '50px'
    } else if (textLength > 10) {
      backgroundColor = 'green'; // Change background color if text length is greater than 10
      padding = '12px'; // Change padding if text length is greater than 10
      margin_right = '25px'
    }

    return {
      'background-color': backgroundColor,
      'padding': padding,
      'margin-right': margin_right
    };
  }
  downloadFile(): void {

    this.fileService.download(`log/${this.chatId}.txt`).subscribe((data: any) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(data);
      a.download = `${this.eventName}.txt`; // Specify the desired file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    });

  }

  goDetail() {
    this.router.navigate(['/event/detail', this.encryptEvent]);
  }

  goToReview() {
    if (this.isOwner === true) {
      let updateData = { status: 3 }
      this.chatService.changeEventStatus(this.eventId, updateData).subscribe((data: any) => {
        if (data.response_desc === 'success') {
          let params = { status: 4, event_id: this.eventId, isOwner: this.isOwner, user_id: this.userId }
          this.chatService.updateReqest(this.member_id, params).subscribe((data: any) => {
            console.log('eventDriver', data);
            if (data.response_desc === 'success') {
              this.router.navigate(['/chat/review/done', this.encryptEvent]);
            }
            // this.driverDetail = data.data;
            this._changeDetectorRef.markForCheck();
          });
        }
        console.log('eventDriver', data);
      });

    } else {
      // ไม่ใช่เจ้าของ events = members ทั่วไป
      let params = { status: 4, event_id: this.encryptEvent, user_id: this.userId, isOwner: this.isOwner }
      this.chatService.updateReqest(this.member_id, params).subscribe((data: any) => {
        console.log('eventDriver', data);
        if (data.response_desc === 'success') {
          this.router.navigate(['/chat/review', this.encryptEvent]);
        }
        this._changeDetectorRef.markForCheck();
      });
    }

  }

  report() {
    // console.log(this.chatList.filter((c:any) => c.owner == c.user_id)[0]);
    const ownerEncryptId = this.chatList.filter((c: any) => c.owner == c.user_id)[0].encrypt_id
    this.router.navigate(['/report', ownerEncryptId]);
  }

  start() {
    this.startCheck = true
    let updateData = { status: 2 }
    this.chatService.changeEventStatus(this.eventId, updateData).subscribe((data: any) => {
      if (data.response_desc === 'success') {
        let param = { encrypt_id: this.cookie.encrypt_id }
        this.chatService.getChatRoomMember(this.encryptEvent, param).subscribe((data: any) => {
          console.log('data chat: ', data);
          this.chatList = data.data;
          // this.memberCount = this.chatList.length;
          // this.eventName = this.chatList[0].event_name;
          // this.chatId = this.chatList[0].event_id;
          this.chatList.forEach((element: any) => {
            if (this.userId == element.user_id) {
              // this.status = element.reqStatus;
              this.eventStatus = element.status;
              // this.member_id = element.members_id;
              if (this.userId == element.owner) {
                this.isOwner = true;
              }
            }
          })
        })
        // this.router.navigate(['/chat/review', this.eventId]);
      }
      console.log('eventDriver', data);
    });
  }

  parseTextContent(text: any) {
    // Split the text content by newline character '\n'
    const messages = text.split('\n').filter(Boolean); // Filter out empty lines

    // Array to store the formatted messages
    const formattedMessages: any = [];

    // Loop through each message and format it
    messages.forEach((message: any) => {
      // Split the message by ' - ' to extract user, message, and timestamp

      const lastIndex = message.lastIndexOf(' - ');
      let newMessage = []

      // If ' - ' is found, split the message into two parts: before and after the last occurrence
      if (lastIndex !== -1) {
        const messageText = message.substring(0, lastIndex);
        const timestamp = message.substring(lastIndex + 3); // Skip the delimiter
        newMessage.push(messageText);
        newMessage.push(timestamp);
      } else {
        // If ' - ' is not found, return the entire message as the message text and empty timestamp
        newMessage.push(message);
        newMessage.push('');
      }
      console.log('newMessage: ', newMessage);
      // splite | to separate url and user
      const firstIndex = newMessage[0].indexOf(' | ');
      let profile = newMessage[0].substring(firstIndex + 3);
      let url = newMessage[0].substring(0, firstIndex); // Skip the delimiter
      console.log('url: ', url);
      console.log('profile: ', profile);
      // let part = []
      const firstIn = profile.indexOf(' : ');
      const name = profile.substring(0, firstIn);
      const usertext = profile.substring(firstIn + 3);
      console.log('usertext: ', usertext);
      // profile




      // const profile_part = part[0].split(' | ');
      // console.log('profilePart: ', profile_part);

      // Extract user, message, and timestamp
      //console.log(part[0],part[1],parts[1]); // user, message, timestamp
      let formatDate = this.parseTimestamp(newMessage[1]);
      const user = name.trim();
      const messageText = usertext;
      const timestamp = formatDate;
      const download_url = url;

      // Format timestamp to ISO 8601 format
      const isoTimestamp = new Date(timestamp).toISOString();
      // const isoTimestamp = new Date(timestamp.valueOf() + 7 * 60 * 60 * 1000).toISOString();

      // Push the formatted message to the array
      formattedMessages.push({
        message: messageText,
        timestamp: isoTimestamp,
        user: user,
        download_url: download_url
      });
    });

    return formattedMessages;
  }
  parseTimestamp(timestamp: any) {
    //old format 3/2/2024, 9:27:26 AM 
    // Split the timestamp by ', ' to separate date and time
    const [dateStr, timeStr] = timestamp.split(', ');

    // Split the date by '/' to extract day, month, and year
    const [month, day, year] = dateStr.split('/');

    // Split the time by ' ' to extract time and AM/PM
    // console.log('timeStr',timeStr);
    const [time, ampm] = timeStr.split(' ');
    const [hour, minute, second] = time.split(':');

    // Convert month to zero-based index (January is 0)
    const monthIndex = parseInt(month) - 1;
    // Initialize a new Date object with the parsed date and time components
    const parsedDate = new Date(year, monthIndex, day,
      ampm === 'PM' ? parseInt(hour) + 12 : parseInt(hour),
      parseInt(minute),
      parseInt(second));

    // UTC+7
    // parsedDate.setUTCHours(parsedDate.getUTCHours() + 7);
    // const utcPlus7Date = new Date(parsedDate.valueOf() + 7 * 60 * 60 * 1000);
    //console.log(utcPlus7Date);

    return parsedDate;
    // return utcPlus7Date.toLocaleString('en-US', {timeZone: 'Asia/Bangkok'});
    // return utcPlus7Date;


    // return isoDate;
  }
  checkDate(date: Date): boolean {
    // console.log('date input: ', date);
    // const today = new Date().toISOString().slice(0, 10);
    const today = new Date();
    const todayUTC = new Date(today.valueOf() + 7 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const messageDate = new Date(date).toISOString().slice(0, 10);
    // console.log(todayUTC +'|'+ messageDate)
    return todayUTC === messageDate;
  }
  goOtherProfile(url: string, fullname: any) {
    let userId = (this.chatList.find((m: any) => m.fullname === fullname)).encrypt_id
    this.router.navigate([url, userId])
  }
}