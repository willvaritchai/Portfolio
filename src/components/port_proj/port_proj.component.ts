import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import * as jQuery from 'jquery';
import { DialogComponent } from '../dialogs/dialogs.component';
import { MatDialog } from '@angular/material/dialog';

declare var window: any;
@Component({
  selector: 'port-proj',
  templateUrl: './port_proj.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();


  @Input() screenType: string | undefined;

  projList: any[] = [

    {
      src: './assets/proj/google_cert.png',
      img: './assets/proj/cert_network/0.png',
      name: 'cert_network',
      title: 'Google Certificate - Bits & Bytes of Computer Networking',
      date: 'Jun 3, 2024'
    },
    {
      src: './assets/proj/1.modride.png',
      img: './assets/proj/1.modride.png',
      name: 'modride',
      title: 'MOD RIDE - Ride Sharing in KMUTT',
      date: 'Sep, 2023 - Apr, 2024'
    },
    {
      src: './assets/proj/google_cert.png',
      img: './assets/proj/cert_support/0.png',
      name: 'cert_support',
      title: 'Google Certificate - Technical Support Fundamentals',
      date: 'Apr 3, 2023'
    },
    {
      src: './assets/proj/2.oasip.png',
      img: './assets/proj/2.oasip.png',
      name: 'oasip',
      title: 'OASIP: Intregrated Project',
      date: 'Apr - Dec, 2022'
    },
    {
      src: './assets/proj/3.funbook.png',
      img: './assets/proj/3.funbook.png',
      name: 'funbook',
      title: 'FUNBOOK - online book store',
      date: 'Feb – Apr, 2022'
    },
    {
      src: './assets/proj/4.wish_grade.png',
      img: './assets/proj/4.wish_grade.png',
      name: 'wyg',
      title: 'Wish Your Grade - grade calculator',
      date: 'Apr, 2022'
    },
    {
      src: './assets/proj/5.obon.png',
      img: './assets/proj/5.obon.png',
      name: 'obon',
      title: 'OBON Festival Project',
      date: 'Nov 2020'

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
      speed: this.screenType == 'm' ? 600 : 900
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
      speed: this.screenType == 'm' ? 600 : 900
    };
  }

  openDialog(projDetail: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      autoFocus: false,
      width: '100%',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
      data: { type: 'proj', detail: projDetail }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == true) {
      }
    });
  }
}
