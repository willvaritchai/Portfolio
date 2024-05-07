import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { AdminService } from './admin.service';
import { CookieService } from 'ngx-cookie-service';
import { filter, takeUntil } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { PreviousRouteService } from 'src/services/PreviousRouteService.service';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { DriverRegisterService } from '../driver-register/driver-register.service';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';
import { ForceLogOutService } from 'src/services/force-log-out/ForceLogOut.service';

declare var window: any;

@Injectable({
    providedIn: 'root'
})
export class LoadingResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor() {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    resolve() {
        window.alertLoading()
    }
}

@Injectable({
    providedIn: 'root'
})
export class UserListResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _adminService: AdminService, private _getExtraDataService: GetExtraDataService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    resolve() {
        const userCookie = this._getExtraDataService.getUserFromCookie()
        const param = { encrypt_id: userCookie?.encrypt_id }
        return this._adminService.getUserList(param);
    }
}

@Injectable({
    providedIn: 'root'
})
export class CountApprovalStatusResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _adminService: AdminService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    resolve() {
        return this._adminService.getCountApprovalStatus();
    }
}

@Injectable({
    providedIn: 'root'
})
export class UserDetailResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _adminService: AdminService, private _getExtraDataService: GetExtraDataService, private _forceLogOutService: ForceLogOutService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    resolve(route: ActivatedRouteSnapshot) {
        let userCookie = this._getExtraDataService.getUserFromCookie()
        let param
        if (userCookie) {
            param = { encrypt_id: userCookie.encrypt_id }
        } else {
            this._forceLogOutService.forceLogout()
        }
        return this._adminService.getUserDetail(route.params['user_id'], param);
    }
}

@Injectable({
    providedIn: 'root'
})
export class CheckUrlResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private cookieService: CookieService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    resolve(): void {
        if (localStorage.getItem('user-signup')) {
            window.alertClose()
            this.router.navigate(['/social-network/friends/suggestion'])
        }

    }
}

@Injectable({
    providedIn: 'root'
})
export class AdminGetDriverProfile implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private driverRegisterService: DriverRegisterService, private cookieService: CookieService,
        private _router: Router, private _getExtraDataService: GetExtraDataService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,
    ) {
        console.clear()
        // const params = { user_id: 0 }
        // if (this.cookieService.check('user')) {
        //     params.user_id = JSON.parse(this.cookieService.get('user')).user_id
        //     console.log(params);
        // }
        let userCookie = this._getExtraDataService.getUserFromCookie()
        // return this.driverRegisterService.getDriverProfile(userCookie.get);
    }
}



