import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import * as jQuery from 'jquery';

declare var window: any;
@Component({
  selector: 'port-exp',
  templateUrl: './port-exp.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MyExpComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();


  private isMsalInitialized: boolean = false;
  @Input() screenType: string | undefined;

  expList: any[] = [
    {
      src: './assets/exp/1.scm.png',
      name: 'scm',
      date: 'Jan - Aug 2023',
      desc: 'Full Stack Developer\n(Internship program)\n SCM S Technologies Co., Ltd.'
    },
    {
      src: './assets/exp/2.it28.png',
      name: 'it28',
      date: 'Jul - Aug 2022',
      desc: 'Copyreader team: Database\nIT#28 Starter Pack'
    },
    {
      src: './assets/exp/3.it27.png',
      name: 'it27',
      date: 'Jul 2021',
      desc: 'Academic team: Database\nIT#27 Starter Pack'
    },
    {
      src: './assets/exp/4.dolphin.png',
      name: 'dolphin',
      date: 'Nov 2020',
      desc: 'Hello World - Dolphin\nFrontEnd team'
    },
  ]

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   * @param {UserProfileListService} _userProfileListService
   */
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private cookieService: CookieService,
    private _changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef,

  ) {


  }

  slideConfig: any

  ngOnInit(): void {
    this.slideConfig = {
      slidesToShow: this.screenType == 'm' ? 1 : 3,
      slidesToScroll: this.screenType == 'm' ? 1 : 3,
      arrows: true,
      infinite: true,
    };
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.slideConfig = {
      slidesToShow: this.screenType == 'm' ? 1 : 3,
      slidesToScroll: this.screenType == 'm' ? 1 : 3,
      arrows: true,
      infinite: true,
    };

    this._changeDetectorRef.markForCheck()
  }

}
