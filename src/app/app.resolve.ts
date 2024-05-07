import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ForceLogOutService } from 'src/services/force-log-out/ForceLogOut.service';
declare var window: any;

@Injectable({
    providedIn: 'root'
})
export class AppLoadingResolver {
    /**
     * Constructor
     */
    constructor(private cookieService: CookieService, private _forceLogoutService: ForceLogOutService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    resolve() {
        if (this.cookieService.check('user')) {
            window.alertLoading()
        } else {
            this._forceLogoutService.forceLogout()
        }
    }
}

// ตัวนี้ ไม่มี loading
@Injectable({
    providedIn: 'root'
})
export class CheckCookieResolver {
    /**
     * Constructor
     */
    constructor(private cookieService: CookieService, private _forceLogoutService: ForceLogOutService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    resolve() {
        if (!this.cookieService.check('user')) {
            this._forceLogoutService.forceLogout()
        }
    }
}