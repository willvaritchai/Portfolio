import { ChangeDetectorRef, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DriverRegisterService } from './driver-register.service';
declare var window: any;

@Injectable({
    providedIn: 'root'
})
export class LoadingResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private cookieService: CookieService,
        private _router: Router,
    ) {
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
export class ReloadResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor() {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    resolve() {
        localStorage.setItem('reload', 'no reload')
    }
}

@Injectable({
    providedIn: 'root'
})
export class GetDriverProfile implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private driverRegisterService: DriverRegisterService, private cookieService: CookieService,
        private _router: Router,
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
        const params = { user_id: 0 }
        if (this.cookieService.check('user')) {
            params.user_id = JSON.parse(this.cookieService.get('user')).user_id
            console.log(params);
        }
        return this.driverRegisterService.getDriverProfile(params.user_id);
    }
}


