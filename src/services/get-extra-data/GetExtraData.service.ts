import { Directive, Injectable, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ForceLogOutService } from '../force-log-out/ForceLogOut.service';
import { Location } from '@angular/common';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class GetExtraDataService {


  constructor(
    private _router: Router,
    private cookieService: CookieService,
    private forcelogoutService: ForceLogOutService,
    private _location: Location,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  truncateAtSpace(input: string): string {
    const spaceIndex = input.indexOf(' ');
    if (spaceIndex !== -1) {
      return input.substring(0, spaceIndex);
    }
    return input; // Return the original string if no space is found
  }

  getDataLocStorage(key: string) {
    let data: any = localStorage.getItem(key)
    if (data) {
      return JSON.parse(data)
    }
  }

  // function สำหรับดึง user จาก cookie ได้ call ใช้ได้เลย
  getUserFromCookie() {
    const userFromStoreData = this.cookieService.get('user');
    if (userFromStoreData) {
      let userData = JSON.parse(userFromStoreData);
      return userData
    } else {
      this.forcelogoutService.forceLogout()
    }
  }

  // กรณีส่ง state-param ผ่าน url (url ที่ส่ง data แนบ โดยไม่แสดงให้เห็นโจ่งแจ่ง)
  getLocationState() {
    return this._location.getState()
  }

  // return url ที่เราอยู่ ปัจจุบัน
  getCurrentUrl(): string {
    let currentUrl = (this.activatedRoute.snapshot as any)._routerState.url;
    // console.log(currentUrl);
    return currentUrl
  }

  // getUrlParam(param: string) {
  //   console.log(this.activatedRoute.params['id']);
  //   return this.activatedRoute.snapshot.params[param];
  // }

  // --------------------------

  // public getDecryptData() {
  //   // Your secret key (should match the one used for encryption in the backend)
  //   const secretKey = 'MoDRideAdmiN.Un2';

  //   const encryptedDataFromBackend = 'Y4GXPrFj4m0up2XEuC5xzg=='; // Replace with the actual encrypted data received from the backend
  //   // Decrypt the encrypted data
  //   const decryptedData = this.decryptAES(encryptedDataFromBackend, secretKey);

  //   // Use the decrypted data as needed
  //   console.log('Decrypted Data:', decryptedData);
  // }

}

