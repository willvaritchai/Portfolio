import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SigninService } from './sign-in.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./sign-in.component.scss'],
})
export class AuthSignInComponent implements OnInit  {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

/**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param {UserProfileListService} _userProfileListService
     */
constructor(
  private _userService: SigninService,
  private _router: Router,

) { }

  userListMock: any
  ngOnInit() {
    // this._userService.getAllUsers().pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
    //     console.log('user-lists-test: ',result);
    //   this.userListMock = result
    // })
    // this._userService.userListData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
    //   console.log('user-list by Observable: ',result);
      
    // })
  }
}
