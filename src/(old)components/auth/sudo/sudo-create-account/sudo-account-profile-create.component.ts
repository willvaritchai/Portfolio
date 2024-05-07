import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, Subject, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { FilesManagementService } from 'src/services/FilesManagementService.service';
import { ValidateFormsService } from 'src/services/ValidateFormService.service';
import { AccountProfileService } from 'src/components/account-profile/account-profile.service';
import { AppComponent } from 'src/app/app.component';

declare var window: any;

@Component({
  selector: 'sudo-account-profile-create',
  templateUrl: './sudo-account-profile-create.component.html',
})
export class SudoAccountProfileCreateComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  filteredFaculties: Observable<any[]> = new Observable<any[]>;
  filteredBranches: Observable<any[]> = new Observable<any[]>;
  filteredOtherContact: Observable<any[]> = new Observable<any[]>;

  data_cover: any[] = [];
  profilePic: string = '';
  profileImgObj: any
  @ViewChild('profile') inputCover: any;

  emailWarn: boolean = false
  disableBtn: boolean = true
  disableBranch: boolean = true
  disableContactInfo: boolean = true
  accountPage: any
  userData: any
  accountFormGroup: FormGroup
  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   * @param {UserProfileListService} _userProfileListService
   */
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _accountProfileService: AccountProfileService,
    private _changeDetectorRef: ChangeDetectorRef,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute,
    private _filesManagementService: FilesManagementService,
    private _validateFormsService: ValidateFormsService,
    private _appComponent: AppComponent,
  ) {
    this.accountFormGroup = this._formBuilder.group({
      // firstname: ['lorem'],
      // lastname: ['lorem'],
      fullname: ['LOREM IPSUM'],
      email: ['lorem@mail.kmutt.ac.th'],
      faculty_name: ['lorem'],
      branch_name: [''],
      branch_id: [null],
      tel: [null],
      other_contact: [''],
      contact_info: [''],
      // roles: [],
    });


    // filterBranch
    this.filteredBranches = this.accountFormGroup.get('branch_name')?.valueChanges.pipe(
      startWith(''),
      map(value => this._branchFilter(value))
    ) as Observable<any[]>;

    this.accountFormGroup.get('faculty_name')?.valueChanges.subscribe(selectedFaculty => {
      this.accountFormGroup.get('branch_name')?.setValue(''); // Clear previous branch selection
      this.accountFormGroup.get('branch_name')?.disable(); // disable branch when fac changes
      console.log(this.accountFormGroup.get('faculty_name')?.value);
      if (typeof this.accountFormGroup.get('faculty_name')?.value === 'object' && this.accountFormGroup.get('faculty_name')?.value != null) {
        this.accountFormGroup.get('branch_name')?.enable(); // check if object = เป็น array ที่พบค่า faculty
        this.disableBranch = false
      } else {
        this.accountFormGroup.get('branch_name')?.disable()
        this.disableBranch = true
      }

    });

    this.accountFormGroup.get('other_contact')?.valueChanges.subscribe(selectedFaculty => {
      this.accountFormGroup.get('contact_info')?.setValue(''); // Clear previous branch selection
      this.accountFormGroup.get('contact_info')?.disable(); // disable branch when fac changes
      console.log(this.accountFormGroup.get('other_contact')?.value);
      console.log(this.otherContact.includes(this.accountFormGroup.get('other_contact')?.value));

      // this.accountFormGroup.get('branch_name')?.enable(); // check if object = เป็น array ที่พบค่า faculty
      if (this.otherContact.includes(this.accountFormGroup.get('other_contact')?.value)) {
        this.accountFormGroup.get('contact_info')?.enable()
        this.disableContactInfo = false
      } else {
        this.accountFormGroup.get('contact_info')?.disable()
        this.disableContactInfo = true
      }
    });

    this.accountFormGroup.get('email')?.valueChanges.subscribe(val => {
      if (this.accountFormGroup.get('email')?.value.includes('@mail.kmutt.ac.th')) {
        this.emailWarn = false
      } else {
        console.log('???');
        this.emailWarn = true
        _changeDetectorRef.markForCheck()
      }
    })

    this.accountFormGroup.valueChanges.subscribe(selectedFaculty => {
      // Check if only one control has a null or empty value
      let resultValidateForm: any = _validateFormsService.checkValidateFormGroup(this.accountFormGroup, true)
      this.validateForDisableBtn(resultValidateForm)
    });

  }

  // filter-func
  private _facFilter(value: any): any[] {
    const filterValue = typeof value === 'object' ? value.faculty_name : value.toLowerCase()
    return this.faculties.filter(faculty => faculty.faculty_name.toLowerCase().includes(filterValue));
  }
  displayFaculty(faculty: any): string {
    return faculty ? faculty.faculty_name : '';
  }

  private _branchFilter(value: any): any[] {
    const selectedFacultyId = this.accountFormGroup.get('faculty_name')?.value?.faculty_id;
    const filterValue = typeof value === 'object' ? value.branch_name : value.toLowerCase()
    let filteredBranches = this.branches;
    if (selectedFacultyId) {
      filteredBranches = this.branches.filter(branch => branch.faculty_id === selectedFacultyId);
    }
    if (typeof this.accountFormGroup.get('branch_name')?.value === 'object' && this.accountFormGroup.get('branch_name')?.value != null) {
      console.log('branch found');
    }

    return filteredBranches.filter(branch => branch.branch_name.toLowerCase().includes(filterValue));
  }
  displayBranch(branch: any): string {
    return branch ? branch.branch_name : '';
  }

  private _otherContactFilter(value: any): any[] {
    const filterValue = value.toLowerCase()
    return this.otherContact.filter(oContact => oContact.toLowerCase().includes(filterValue));
  }
  displayOtherContactFilter(oContact: any): string {
    return oContact;
  }



  faculties: any[] = [];
  branches: any[] = [];
  otherContact: any[] = ['Line ID', 'Facebook', 'Instragram'];

  ngOnInit() {
    this._appComponent.detectShowNav(false)
    window.alertClose()
    let userMsAccount: any = (localStorage.getItem('ms-account'))
    userMsAccount = JSON.parse(userMsAccount)
    if (userMsAccount) {
      this.accountFormGroup.get('fullname')?.setValue(userMsAccount.fullname)
      // this.accountFormGroup.get('firstname')?.setValue(userMsAccount.fullname.split(" ")[0])
      // this.accountFormGroup.get('lastname')?.setValue(userMsAccount.fullname.split(" ")[1])
      this.accountFormGroup.get('email')?.setValue(userMsAccount.email)
    }




    this.accountPage = this.cookieService.get('url');
    console.log('url: ', this.accountPage);
    if (this.accountPage == '/account/detail') {
      console.log('my-profile: ', this.userData);
      this.accountFormGroup.patchValue(this.userData)
      console.log('my-acc formgroup: ', this.accountFormGroup.getRawValue());
      console.log('filter-fac: ', this.filteredFaculties);

    }
    // filterFac
    this.filteredFaculties = this.accountFormGroup.get('faculty_name')?.valueChanges.pipe(
      startWith(''),
      map(value => this._facFilter(value))
    ) as Observable<any[]>;

    // filter-otherContact
    this.filteredOtherContact = this.accountFormGroup.get('other_contact')?.valueChanges.pipe(
      startWith(''),
      map(value => this._otherContactFilter(value))
    ) as Observable<any[]>;



    this.accountFormGroup.get('branch_name')?.disable()
    this.accountFormGroup.get('contact_info')?.disable()
    // this.accountFormGroup.get('fullname')?.setValue(this.accountFormGroup.get('firstname')?.value +' '+ this.accountFormGroup.get('lastname')?.value)
    this._accountProfileService.facultyListData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      if (result.response_code == 200) {
        this.faculties = result.data
        console.log('คณะ: ', this.faculties);
      }
    })
    this._accountProfileService.branchListData.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {
      if (result.response_code == 200) {
        this.branches = result.data
        console.log('สาขา: ', this.branches);
      }
    })
  }

  onInputPhone(event: any) {
    const input = event.target.value;
    const pattern = /^\d*$/; // Regular expression to allow only numbers
    if (!pattern.test(input)) {
      event.target.value = input.replace(/\D/g, ''); // Remove non-numeric characters
    }
  }

  createAcc() {
    console.clear()
    window.alertLoading()
    let branchSelected = this.accountFormGroup.get('branch_name')?.value
    let oldFacName = this.accountFormGroup.get('faculty_name')?.value
    let faculty_name = this.accountFormGroup.get('faculty_name')?.value.faculty_name
    let branch_name = this.accountFormGroup.get('branch_name')?.value.branch_name
    this.accountFormGroup.get('branch_id')?.setValue(branchSelected.branch_id)
    this.accountFormGroup.get('faculty_name')?.setValue(faculty_name)
    this.accountFormGroup.get('branch_name')?.setValue(branch_name)

    // step: 1.insert-account >> 2.upload-file (id from n)
    let data = this.accountFormGroup.getRawValue()
    console.log(data);
    this._accountProfileService.createAccount(data).subscribe((result: any) => {
      if (result.response_code == 200) {
        console.log('users-signup-finish: ', result.data);
        localStorage.setItem('user-signup', JSON.stringify(result.data));
        this.uploadUserProfile(result.data.user_id)
      } else {
        window.alertFail(result.response_desc)
        this.accountFormGroup.get('branch_id')?.reset()
        this.accountFormGroup.get('faculty_name')?.setValue(oldFacName)
        this.accountFormGroup.get('branch_name')?.setValue(branchSelected)
        this._changeDetectorRef.markForCheck();
      }
    })
  }

  uploadUserProfile(userId: any) {
    let userProfileParam = {
      id: userId,
      category: this._filesManagementService.storeCategory.user,
      size: this.profileImgObj?.fileSize ? (this.profileImgObj?.fileSize).toString() : '0'
    }
    let userProfileFormData = this._filesManagementService.onUploadAttachment(this.data_cover, userProfileParam)
    this._filesManagementService.attachFile(userProfileFormData).subscribe((result: any) => {
      console.log('result: ', result);
      if (result.response_code == 200) {
        this._changeDetectorRef.markForCheck()
        this._router.navigate([`/social-network/friends/suggestion`], { state: result.data });
      } else {
        window.alertFail(result.response_desc)
        this._changeDetectorRef.markForCheck();
      }
    })
  }

  // upload-img-profile
  changeFile(event: any) {
    let checkFile = this._filesManagementService.checkFile(event,true)
    if (checkFile) {
      // file-manage
      const [file] = event.target.files;
      const reader = new FileReader();
      if (file) { // กัน error หากเปิด input-file กดไฟล์ที่ต้องการ แต่ cancel+ปิด input window
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.profilePic = reader.result as string;
          this._changeDetectorRef.markForCheck();
        };
        if (this.data_cover.length = 0) {
          this.data_cover.push({
            file: event.target.files[0],
            fileName: event.target.files[0].name,
            fileSize: this._filesManagementService.convertSizeToMb(event.target.files[0].size), //MB
          });
        } else {
          this.data_cover.splice(0, 1, {
            file: event.target.files[0],
            fileName: event.target.files[0].name,
            fileSize: this._filesManagementService.convertSizeToMb(event.target.files[0].size), //MB
          });
        }
        this.profileImgObj = this.data_cover[0]
        console.log((this.profileImgObj?.fileSize).toString());
        let resultValidateForm: any = this._validateFormsService.checkValidateFormGroup(this.accountFormGroup, true)
        this.validateForDisableBtn(resultValidateForm)
      }
    } else {
      this.inputCover.nativeElement.value = null;
    }
  }

  validateForDisableBtn(validateResult: any) {
    // validateResult = true = เจอปัญหา , false = ไม่เจอ
    if (this.data_cover.length > 0 && !this.emailWarn) {
      this.disableBtn = validateResult
    } else {
      this.disableBtn = true
    }

  }


}

