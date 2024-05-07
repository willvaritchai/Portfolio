import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from './home.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SigninService } from '../home/sign-in.service';
import { CookieService } from 'ngx-cookie-service';
import { AccountProfileService } from '../account-profile/account-profile.service';
import { AppComponent } from 'src/app/app.component';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { imgAsset } from 'src/environment-variables/img.asset.service';
declare var window: any;

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  regisDriver: any = imgAsset.regisDriver
  tripSuggest: any = imgAsset.tripSuggest

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  userData: any
  checkEventList: any
  homeRoute: any
  studyRoute: any
  travelRoute: any

  /**
       * Constructor
       *
       * @param {HttpClient} _httpClient
       */
  constructor(
    private _homeService: HomeService,
    private _userService: SigninService,
    private _getExtraDataService: GetExtraDataService,
    private _router: Router,
    private cookieService: CookieService,
    private _accountProfileService: AccountProfileService,
    private _appComponent: AppComponent,
    private elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,

  ) { }



  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = 'white';

    const userFromStoreData = this.cookieService.get('user');
    this.userData = JSON.parse(userFromStoreData);

    if (this.userData.role_id != 1) {
      this._homeService.favRouteListData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
        const favRouteList = result.data
        this.categorizeFavRoute(favRouteList)
        this._changeDetectorRef.markForCheck()
      })
    }

  }

  categorizeFavRoute(favRouteList: any) {
    favRouteList.forEach((r: any) => {
      switch (r.route_type) {
        case 'home':
          this.homeRoute = r
          console.log('homeroute: ', r);
          break;
        case 'study':
          this.studyRoute = r
          console.log('study: ', r);
          break;
        case 'travel':
          this.travelRoute = r
          console.log('travel: ', r);
          break;
      }
    });
    console.log('user-cookie: ', this.userData);

  }

  eventListData(data: any) {
    console.log('check-data', data);
    this.checkEventList = data
    this._changeDetectorRef.markForCheck
  }

  go(path: string, dataFavRoute: any = null) {
    if (dataFavRoute) {
      localStorage.setItem('fav_route', JSON.stringify(dataFavRoute))
    }
    this._appComponent.go(path)
  }

  passengerPost() {
    window.alert('กำลังอยู่ในการดำเนินการ \nขออภัยในความไม่สะดวก')
  }

  // onUploadImg(event: any) {
  //   const reader = new FileReader();
  //   console.log(event.target.files[0]);
  //   const [file] = event.target.files;
  //   reader.readAsDataURL(file);
  //   this.ocr(event.target.files[0])
  // }

  carousel() {
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
