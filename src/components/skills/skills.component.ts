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
  selector: 'skills',
  templateUrl: './skills.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SkillsComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();


  private isMsalInitialized: boolean = false;
  @Input() screenType: string | undefined;

  hardSkillList: any[] = [
    {
      src: './assets/skills/hard/1.js.png',
      name: 'js',
    },
    {
      src: './assets/skills/hard/2.ts.png',
      name: 'ts',
    },
    {
      src: './assets/skills/hard/3.tailwind.png',
      name: 'tailwind',
    },
    {
      src: './assets/skills/hard/4.angular.png',
      name: 'angular',
    },
    {
      src: './assets/skills/hard/5.vue.png',
      name: 'vue',
    },
    {
      src: './assets/skills/hard/6.java.png',
      name: 'java',
    },
    {
      src: './assets/skills/hard/7.springboot.png',
      name: 'springboot',
    },
    {
      src: './assets/skills/hard/8.sql.png',
      name: 'sql',
    },
    {
      src: './assets/skills/hard/9.github.png',
      name: 'github',
    },
  ]
  hardSkillList2: any[] = [
    {
      src: './assets/skills/hard/10.docker.png',
      name: 'docker',
    },
    {
      src: './assets/skills/hard/11.linux.png',
      name: 'linux',
    },

  ]

  softSkillList: any[] = [
    {
      src: './assets/skills/soft/1.leader.png',
      name: 'leader',
    },
    {
      src: './assets/skills/soft/2.commu.png',
      name: 'commu',
    },
    {
      src: './assets/skills/soft/3.solving.png',
      name: 'solving',
    },
    {
      src: './assets/skills/soft/4.time-man.png',
      name: 'time',
    },

  ]


  isClicked: any = null
  isFade: boolean = false
  brainType: any = null
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


  brainClick(type: number) {
    // left brain
    if (type == 0) {
      this.isClicked = 0
      setTimeout(() => {
        this.isFade = true
        this.brainType = 0
        this._changeDetectorRef.markForCheck()

      }, 100);
    } else { // right brain
      this.isClicked = 1
      setTimeout(() => {
        this.isFade = true
        this.brainType = 1
        this._changeDetectorRef.markForCheck()

      }, 100);
    }
  }
}
