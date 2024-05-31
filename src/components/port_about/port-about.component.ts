import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

declare var window: any;
@Component({
  selector: 'port-about',
  templateUrl: './port-about.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PortAboutComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();


  private isMsalInitialized: boolean = false;
  @Input() screenType: string | undefined;


  edu:string = 'sit'
  showEduDesc:boolean = false
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

  ngOnInit(): void {

  }

  downloadTs(){
    const filePath = `https://drive.google.com/file/d/1j8y7cUW4Pcct8C8xubzz33Ib5xXx3Hft/view?usp=sharing`; // Path to your file in the assets folder
    window.open(filePath, '_blank');
  }
}
