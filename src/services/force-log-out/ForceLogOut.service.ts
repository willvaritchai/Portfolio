import { Directive, Injectable, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
declare var window: any

@Injectable({
  providedIn: 'root',
})
export class ForceLogOutService {
  constructor(
    private _router: Router,
  ) {
  }

  forceLogout() {
    window.alertFail('กรุณาเข้าสู่ระบบ')
      .then(() => {
        this._router.navigate(['/sign-in']);
      })
  }
}
