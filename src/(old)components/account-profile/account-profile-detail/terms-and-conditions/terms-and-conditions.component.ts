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


declare var window: any;

@Component({
  selector: 'terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
})
export class TermsAndConditionsComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
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
  ) {

  }

  ngOnInit() {
    console.clear()

  }


}

