import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SudoAlreadyHasAccService } from './sudo-already-has-acc.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
declare var window: any
@Component({
  selector: 'sudo-already-has-acc',
  templateUrl: './sudo-already-has-acc.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SudoAlreadyHasAccComponent implements OnInit {
  alreadyHasAccFormGroup: FormGroup

  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _sudoAlreadyHasAccService: SudoAlreadyHasAccService,
    private _changeDetectorRef: ChangeDetectorRef,
    private cookieService: CookieService,
    private dialog: MatDialog,
    private _router: Router,
    private _appComponent: AppComponent,
  ) {
    this.alreadyHasAccFormGroup = this._formBuilder.group({
      email: [],
    });
  }

  ngOnInit(): void {
    this._appComponent.detectShowNav(false)
  }

  signinByEmail() {
    window.alertLoading()
    console.clear()
    const emailData = this.alreadyHasAccFormGroup.getRawValue()
    this._sudoAlreadyHasAccService.getUserByEmail(emailData).subscribe((result: any) => {
      if (result.response_desc == 'success') {
        console.log('users-by-email: ', result.data);
        if (result.data) {
          this._appComponent.setUserCookie(result.data, true)
          this._router.navigate(['/home'])
        } else {
          window.alertClose()
          this.openDialog()
        }
        this._changeDetectorRef.markForCheck()
      } else {
        window.alertFail(result.response_desc)
        this._changeDetectorRef.markForCheck();

      }
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
}