import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, takeUntil } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import * as jQuery from 'jquery';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialogs/dialogs.component';

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
      src: './assets/exp/0.modride.png',
      img: './assets/exp/0.modride/1.png',
      name: 'dday',
      date: '29 Apr 2024',
      desc: 'IT BANGMOD D-Day 2024',
      title: 'IT BANGMOD D-Day 2024'
    },
    {
      src: './assets/exp/1.scm.png',
      img: './assets/exp/1.1scm.png',
      name: 'scm',
      date: 'Jan - Aug 2023',
      desc: 'Full Stack Developer\n(Internship program)\n SCM S Technologies Co., Ltd.',
      title: 'Full Stack Developer (Internship program) SCM S Technologies Co., Ltd.'
    },
    {
      src: './assets/exp/2.it28.png',
      img: './assets/exp/2.1it28.png',
      name: 'it28',
      date: 'Jul - Aug 2022',
      desc: 'Copyreader team: Database\nIT#28 Starter Pack',
      title: 'Copyreader team: Database IT#28 Starter Pack',
    },
    {
      src: './assets/exp/3.it27.png',
      img: './assets/exp/3.1it27.png',
      name: 'it27',
      date: 'Jul 2021',
      desc: 'Academic team: Database\nIT#27 Starter Pack',
      title: 'Academic team: Database IT#27 Starter Pack'
    },
    {
      src: './assets/exp/4.dolphin.png',
      img: './assets/exp/4.1dolphin.png',
      name: 'dolphin',
      date: 'Nov 2020',
      desc: 'Hello World - Dolphin\nFrontEnd team',
      title: 'Hello World - Dolphin FrontEnd team'
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
    private dialog: MatDialog,

  ) {


  }

  slideConfig: any

  ngOnInit(): void {
    this.slideConfig = {
      slidesToShow: this.screenType == 'm' ? 1 : 3,
      slidesToScroll: this.screenType == 'm' ? 1 : 3,
      arrows: true,
      infinite: true,
      draggable: true,
      speed: this.screenType == 'm' ? 600:900
    };
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.slideConfig = {
      slidesToShow: this.screenType == 'm' ? 1 : 3,
      slidesToScroll: this.screenType == 'm' ? 1 : 3,
      arrows: true,
      infinite: true,
      draggable: true,
      speed: this.screenType == 'm' ? 600:900

    };

    this._changeDetectorRef.markForCheck()
  }


  openDialog(expDetail: any) {
    console.clear()
    console.log('open dialog');

    const dialogRef = this.dialog.open(DialogComponent, {
      autoFocus: false,
      width: '100%',
      data: { type: 'exp', detail: expDetail }
    });

    dialogRef.afterClosed().subscribe(result => {
      this._changeDetectorRef.markForCheck()
    });
  }
}
