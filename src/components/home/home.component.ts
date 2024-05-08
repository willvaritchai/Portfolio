import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';
import { HostListener } from '@angular/core';


declare var window: any;
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();


  screenType: string = ''

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
    private _appComponent: AppComponent,
    private _getExtraDataService: GetExtraDataService,
    private elementRef: ElementRef,

  ) {


  }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Call your function to process screen size changes here
    this.checkScreenSize();
  }

  checkScreenSize() {
    const width = window.innerWidth;
    console.log(width);
    

    if (width >= 1536) {
      this.screenType = 'pc'
    } else if (width >= 1280){
      this.screenType = 'lt'
    }else{
      this.screenType = 'm'
    }
    console.log(this.screenType);
    
    this._changeDetectorRef.markForCheck()
  }

}
