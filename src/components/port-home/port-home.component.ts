import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { SnackbarService } from 'src/services/SnackbarService.service';

declare var window: any;
@Component({
  selector: 'port-home',
  templateUrl: './port-home.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PortHomeComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  private isMsalInitialized: boolean = false;
  @Input() screenType: string | undefined;

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
    private snackbarService: SnackbarService
  ) {}

  text: string[] = [''];

  ngOnInit(): void {
    setTimeout(() => {
      this.text = ['Full Stack Developer'];
      console.log(this.text);
    }, 2000);
  }

  // open(linkType: string = '') {
  //   let filePath: string = ''
  //   switch (linkType) {
  //     case 'git':
  //       filePath = `https://github.com/willvaritchai`;
  //       break;
  //     case 'fb':
  //       filePath = `https://www.facebook.com/pas.surachai`;
  //       break;
  //     case 'email':
  //       filePath = `varitchai.will@gmail.com`;
  //       break;
  //     case 'tel':
  //       filePath = `0814985488`;
  //       break;
  //   }
  //   if (linkType != 'tel' && linkType != 'email') {
  //     window.open(filePath, '_blank');
  //     return
  //   }
  //   if (linkType == 'email') {
  //     window.open('mailto:' + filePath, '_blank');
  //     return
  //   }
  //   if (linkType == 'tel') {
  //     window.open('tel:' + filePath);
  //     return
  //   }
  // }

  open(filePath: string = '') {
    window.open(filePath, '_blank');
  }

  copyTextToClipboard() {
    this.snackbarService.openSnackbar('Email copied successfully !');

    const textarea = document.createElement('textarea');
    textarea.value = 'varitchai.will@gmail.com';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    this._changeDetectorRef.markForCheck()
  }
}
