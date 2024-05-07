import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var window: any;

@Injectable({
    providedIn: 'root'
})
export class LoadingResolver implements Resolve<any>
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
        window.alertLoading()
    }
}

@Injectable({
    providedIn: 'root'
})
export class CheckLogoutResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private cookieService: CookieService,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    resolve() {
        console.log('check-logout');
        if (localStorage.getItem('user')) {
            console.log('มี');
            window.alertClose()
            this._router.navigate(['/home'])
        }
        return;
    }
}

@Injectable({
    providedIn: 'root'
})
export class CheckHaveUserCookieResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private cookieService: CookieService,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    resolve() {
        if (this.cookieService.check('user')) {
            window.alertClose()
            this._router.navigate(['/home'])
        }
        return;
    }
}

@Injectable({
    providedIn: 'root'
})
export class CheckNotHaveUserCookieHomeResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private cookieService: CookieService,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    resolve() {
        if (!this.cookieService.check('user')) {
            window.alertClose()
            this._router.navigate(['/sign-in'])
        } 
        return;
    }
}

