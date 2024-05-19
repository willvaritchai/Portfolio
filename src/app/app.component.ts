import { Location } from '@angular/common';
import { AfterContentChecked, AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject, filter, takeUntil } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  showIfIncludeRouter: boolean = false;
  showFriendOrangeIcon: boolean = false;
  url: any
  userCookie: any;
  disablePost: any;
  role: any;

  constructor(
    private _router: Router,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService,
    private _changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private elementRef: ElementRef,
  ) {
  }

  ngOnInit(): void {
    


  }

}
