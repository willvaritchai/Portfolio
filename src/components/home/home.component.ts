import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from './home.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit  {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

/**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param {UserProfileListService} _userProfileListService
     */
constructor(
  private _userService: HomeService,
  private _router: Router,

) { }

  userListMock: any
  ngOnInit() {
    // this._userService.getAllUsers().pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
    //     console.log('user-lists-test: ',result);
    //   this.userListMock = result
    // })

    this._userService.userListData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      console.log('user-list by Observable: ',result);
      this.userListMock = result
    })
  }
}
