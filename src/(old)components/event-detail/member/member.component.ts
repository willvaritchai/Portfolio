import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDetalService } from '../event-detail.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';

@Component({
  selector: 'member',
  templateUrl: './member.component.html',
  // encapsulation: ViewEncapsulation.None,
  //   styleUrls: ['./event-detail.component.scss'],
})
export class MemberComponent implements OnInit, OnChanges {

  //Get type from home component
  @Input() members: any | undefined;
  @Input() userId: any | undefined;

  url: string = ''
  userCookie: any
  public memberList: any[] = [];
  public friendtype: any | undefined;
  public mutalfriend: any | undefined;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  /**
       * Constructor
       *
       * @param {HttpClient} _httpClient
       */
  constructor(
    private _eventService: EventDetalService,
    private _getExtraDataService: GetExtraDataService,
    // private _userService: SigninService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _appComponent: AppComponent,
  ) { }



  ngOnInit() {
    this._changeDetectorRef.markForCheck();
    console.log('members: ', this.members);
    this.userCookie = this._getExtraDataService.getUserFromCookie()
    this.url = this._getExtraDataService.getCurrentUrl()
    console.log(this.url);


    this.memberList = this.members
    this.memberList?.forEach((member: any) => {
      switch (this.url) {
        case '/threads/detail':
          if (member.isThisFriend == true) {
            member.friendtype = 'friend'
          } else if (member.count_mutual) {
            member.friendtype = 'mutualfriend'
            member.mutalfriend = member.count_mutual
          } else {
            member.friendtype = null
          }
          console.log(this.memberList);

          break;

        default:
          console.log('default');

          if (member.isThisFriend == true) {
            member.friendtype = 'friend'
          } else if (member.mutualFriend != null) {
            member.friendtype = 'mutualfriend'
            member.mutalfriend = member.mutualFriend.length
          } else {
            member.friendtype = null
          }
          break;
      }
    });
    //   this._eventService.getAllEvent().pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
    //     console.log('event-lists-test: ',result);
    //   this.memberList = result.data
    //   if(this.memberMock.length > 0){
    //     if(this.memberMock.isThisFriend == true){
    //       this.friendtype = 'friend'
    //     }else if(this.memberMock.mutualFriend!=null){
    //       this.friendtype = 'mutualfriend'
    //       this.mutalfriend = this.memberMock.mutualFriend.length
    //     }else {
    //       this.friendtype = null
    //     }
    this._changeDetectorRef.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['members'].currentValue) {
      this.memberList = changes['members'].currentValue
      console.log('changes-members: ', this.memberList);
      this.memberList.forEach((member: any) => {
        switch (this.url) {
          case '/threads/detail':
            if (member.isThisFriend == true) {
              member.friendtype = 'friend'
            } else if (member.count_mutual) {
              member.friendtype = 'mutualfriend'
              member.mutalfriend = member.count_mutual
            } else {
              member.friendtype = null
            }
            break;

          default:
            if (member.isThisFriend == true) {
              member.friendtype = 'friend'
            } else if (member.mutualFriend != null) {
              member.friendtype = 'mutualfriend'
              member.mutalfriend = member.mutualFriend.length
            } else {
              member.friendtype = null
            }
            break;
        }
      });
      // this.memberList.forEach((member: any) => {
      //   if(member.isThisFriend == true){
      //     this.friendtype = 'friend'
      //   }else if(member.mutualFriend!=null){
      //     this.friendtype ='mutualfriend'
      //     this.mutalfriend = member.mutualFriend.length
      //   }else {
      //     this.friendtype = null
      //   }
      // });
      this._changeDetectorRef.markForCheck();
    }
    // this.eventDetail = changes.detail.currentValue;
    this._changeDetectorRef.markForCheck();
  }


  // onUploadImg(event: any) {
  //   const reader = new FileReader();
  //   console.log(event.target.files[0]);
  //   const [file] = event.target.files;
  //   reader.readAsDataURL(file);
  //   this.ocr(event.target.files[0])
  // }
  go(url: string, userId: any) {
    // หาก user ที่กดดูเป็นของเราเอง จะพาไปหน้า acc-detail ตัวเอง
    if (userId == this.userCookie.encrypt_id) {
      url = '/account/detail'
      this._appComponent.go(url)
    } else {
      this._router.navigate([url, userId])
    }
  }
}
