import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import * as jQuery from 'jquery';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialogs/dialogs.component';

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
      img: './assets/skills/hard/1.js/0.png',
      title: 'Hard Skills | Java Script ',
      name: 'js',
    },
    {
      src: './assets/skills/hard/2.ts.png',
      img: './assets/skills/hard/2.ts/0.png',
      title: 'Hard Skills | Type Script ',
      name: 'ts',
    },
    {
      src: './assets/skills/hard/3.tailwind.png',
      img: './assets/skills/hard/3.tailwind/0.png',
      title: 'Hard Skills | Tailwind CSS ',
      name: 'tailwind',
    },
    {
      src: './assets/skills/hard/4.angular.png',
      img: './assets/skills/hard/4.angular/0.png',
      title: 'Hard Skills | Angular Framework ',
      name: 'angular',
    },
    {
      src: './assets/skills/hard/5.vue.png',
      img: './assets/skills/hard/5.vue/0.png',
      title: 'Hard Skills | Vue Framework ',
      name: 'vue',
    },
    {
      src: './assets/skills/hard/6.java.png',
      img: './assets/skills/hard/6.java/0.png',
      title: 'Hard Skills | Java Programming ',
      name: 'java',
    },
    {
      src: './assets/skills/hard/7.springboot.png',
      img: './assets/skills/hard/7.springboot/0.png',
      title: 'Hard Skills | Spring Boot Framework ',
      name: 'springboot',
    },
    {
      src: './assets/skills/hard/8.sql.png',
      img: './assets/skills/hard/8.sql/0.png',
      title: 'Hard Skills | MySQL DBMS ',
      name: 'sql',
    },
    {
      src: './assets/skills/hard/9.github.png',
      img: './assets/skills/hard/9.git/0.png',
      title: 'Hard Skills | Git Version Control ',
      name: 'github',
    },
  ]
  hardSkillList2: any[] = [
    {
      src: './assets/skills/hard/10.docker.png',
      img: './assets/skills/hard/10.docker/0.png',
      title: 'Hard Skills | Docker ',
      name: 'docker',
    },
    {
      src: './assets/skills/hard/11.linux.png',
      img: './assets/skills/hard/11.linux/0.png',
      title: 'Hard Skills | Linux Command ',
      name: 'linux',
    },

  ]

  softSkillList: any[] = [
    {
      src: './assets/skills/soft/1.leader.png',
      img: './assets/skills/soft/1.leader/0.png',
      title: 'Soft Skills | Leadership ',
      name: 'leader',
    },
    {
      src: './assets/skills/soft/2.commu.png',
      img: './assets/skills/soft/2.commu/0.png',
      title: 'Soft Skills | Communication ',
      name: 'commu',
    },
    {
      src: './assets/skills/soft/3.solving.png',
      img: './assets/skills/soft/3.solving/0.png',
      title: 'Soft Skills | Problem Solving ',
      name: 'solving',
    },
    {
      src: './assets/skills/soft/4.time-man.png',
      img: './assets/skills/soft/4.time/0.png',
      title: 'Soft Skills | Time Management ',
      name: 'time',
    },

  ]


  isClicked: string = ''
  isFade: boolean = false
  brainType: any = null
  isFullBrainClick: boolean = false
  fullBrainOut: boolean = false
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


  brainClick(type: string = '') {
    this.isClicked = type

    // left brain
    switch (type) {
      case 'left':
        setTimeout(() => {
          this.isFade = true
          this.brainType = 0
          this._changeDetectorRef.markForCheck()

        }, 100);
        break;
      case 'right':
        setTimeout(() => {
          this.isFade = true
          this.brainType = 1
          this._changeDetectorRef.markForCheck()

        }, 100);
        break;

      default:
        this.isFullBrainClick = true
        setTimeout(() => {
          this.fullBrainOut = true
          this._changeDetectorRef.markForCheck()
        }, 200);
        break;
    }

  }

  openDialog(detail: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      autoFocus: false,
      width: '100%',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
      data: { type: 'skill', detail: detail }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == true) {
      }
    });
  }
}
