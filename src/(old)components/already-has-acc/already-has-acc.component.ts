import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlreadyHasAccService } from './already-has-acc.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';
declare var window: any
@Component({
  selector: 'already-has-acc',
  templateUrl: './already-has-acc.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlreadyHasAccComponent implements OnInit {
  alreadyHasAccFormGroup: FormGroup
  userCookie: any

  passWarn: boolean = false
  showPass: boolean = false
  inputType: string = 'password'
  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _alreadyHasAccService: AlreadyHasAccService,
    private _changeDetectorRef: ChangeDetectorRef,
    private cookieService: CookieService,
    private dialog: MatDialog,
    private _router: Router,
    private _appComponent: AppComponent,
    private _getExtraDataService: GetExtraDataService,
  ) {
    this.alreadyHasAccFormGroup = this._formBuilder.group({
      fullname: [''],
      password: [''],
    });

    this.alreadyHasAccFormGroup.get('password')?.valueChanges.subscribe(val => {
      if (this.alreadyHasAccFormGroup.get('password')?.value.length < 8) {
        this.passWarn = true
      } else {
        this.passWarn = false
      }
    })

  }

  ngOnInit(): void {
    this._appComponent.detectShowNav(false)
  }

  adminSignin() {
    window.alertLoading()
    console.clear()
    const data = this.alreadyHasAccFormGroup.getRawValue()
    this._alreadyHasAccService.adminSignin(data).subscribe((result: any) => {
      if (result.response_desc == 'success') {
        console.log('admin-users: ', result.data);
        if (result.data) {
          this._appComponent.setUserCookie(result.data, true)
          this._router.navigate(['/user-management/list'])
        } else {
          window.alertClose()
          this.openDialog()
        }
        this._changeDetectorRef.markForCheck()
      } else {
        window.alertFail(result.response_desc)
        this._changeDetectorRef.markForCheck();

      }
    }, e => {
      window.alertClose()
      this.openDialog()
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      width: '100%',
      data: 'login-email'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        window.alertLoading()
        this._router.navigate(['/account/create-user'])
      }
    });
  }

  showPassword(action: string) {
    switch (action) {
      case 'show':
        this.showPass = true
        this.inputType = 'text'
        break;
      case 'hide':
        this.showPass = false
        this.inputType = 'password'
        break;
    }
  }
}
