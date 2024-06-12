import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil, Subject, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/components/dialogs/confirm-dialog.component';
import { AppComponent } from 'src/app/app.component';
import { imgAsset } from 'src/environment-variables/img.asset.service';
import { FilesManagementService } from 'src/services/FilesManagementService.service';
import { urlService } from 'src/environment-variables/url.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccountProfileService } from '../../account-profile.service';


declare var window: any;

@Component({
  selector: 'favourite-places',
  templateUrl: './favourite-places.component.html',
})
export class FavouritePlacesComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  homeRoute: any
  studyRoute: any
  travelRoute: any

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   * @param {UserProfileListService} _userProfileListService
   */
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private cookieService: CookieService,
    private dialog: MatDialog,
    private _filesManagementService: FilesManagementService,
    private _appComponent: AppComponent,
    private _accountProfileService: AccountProfileService,
  ) {

  }

  ngOnInit() {
    console.clear()
    this._accountProfileService.favRouteListData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      if (result.response_code === 200) {
        console.log('fav-route-list: ', result);
        let favRouteList = result.data
        this.favRouteType(favRouteList)
        window.alertClose()
        this._changeDetectorRef.markForCheck();
      }
    })
  }

  favRouteType(favRouteList: any) {
    if (favRouteList.length > 0) {
      favRouteList.forEach((f: any) => {
        switch (f.route_type) {
          case 'home':
            this.homeRoute = f
            console.log('homeroute: ', f);
            break;
          case 'study':
            this.studyRoute = f
            console.log('study: ', f);
            break;
          case 'travel':
            this.travelRoute = f
            console.log('travel: ', f);
            break;
        }
      });
    }
  }

  go(data: any, type: string) {
    console.log(data);
    localStorage.setItem('route_type', JSON.stringify({ route_type: type }))
    if (data) {
      this._appComponent.go('/account/favourite-routes/edit', data.encrypt_id, true)
    } else {
      this._appComponent.go('/account/favourite-routes/create')
    }
  }
}





