import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EventDetalService } from './event-detail.service';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';
import { ForceLogOutService } from 'src/services/force-log-out/ForceLogOut.service';
declare var window: any;

@Injectable({
    providedIn: 'root'
})
export class LoadingResolver implements Resolve<any> {
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

@Injectable({
    providedIn: 'root'
})
export class ReloadResolver implements Resolve<any> {
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
export class GetEventDetalResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private eventDetailService: EventDetalService, private cookieService: CookieService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const params = { user_id: JSON.parse(this.cookieService.get('user')).user_id };
        console.log('GetEventDetalResolver');
        return this.eventDetailService.getById(route.params['id'], params);
    }
}

@Injectable({
    providedIn: 'root'
})
export class GetVehicleListResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private eventDetailService: EventDetalService, private cookieService: CookieService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const params = { user_id: JSON.parse(this.cookieService.get('user')).user_id };
        return this.eventDetailService.getVehicle(params.user_id);
    }
}


