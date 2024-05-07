import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { AccountProfileService } from './account-profile.service';
import { CookieService } from 'ngx-cookie-service';
import { filter, takeUntil } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { PreviousRouteService } from 'src/services/PreviousRouteService.service';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';

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
export class FacultiesResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private accProfileService: AccountProfileService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    resolve() {
        return this.accProfileService.getFaculties();
    }
}

@Injectable({
    providedIn: 'root'
})
export class BranchesResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private accProfileService: AccountProfileService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    resolve() {
        return this.accProfileService.getBranches();
    }
}

@Injectable({
    providedIn: 'root'
})
export class UserAccountResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private accProfileService: AccountProfileService,
        private cookieService: CookieService,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    resolve() {
        if (this.cookieService.get('user')) {
            const userFromStoreData = this.cookieService.get('user');
            const userData = JSON.parse(userFromStoreData);
            return this.accProfileService.getUserById(userData.user_id);
        }
        else {
            this._router.navigate(['/sign-in'])
        }
        return;
    }
}

@Injectable({
    providedIn: 'root'
})
export class OtherProfileResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private accProfileService: AccountProfileService, private getExtraData: GetExtraDataService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     */
    resolve(route: ActivatedRouteSnapshot) {
        let userData = this.getExtraData.getUserFromCookie()
        let param = {
            my_id: userData?.user_id,
            branch_name: userData?.branch_name,
            encrypt_id: route.params['id'],
        }
        return this.accProfileService.getOtherProfile(param);
    }
}

@Injectable({
    providedIn: 'root'
})
export class AllFavRouteResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private accProfileService: AccountProfileService, private getExtraData: GetExtraDataService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     */
    resolve(route: ActivatedRouteSnapshot) {
        let userData = this.getExtraData.getUserFromCookie()
        return this.accProfileService.getAllFavRoutes(userData.encrypt_id);
    }
}

@Injectable({
    providedIn: 'root'
})
export class GetFavRoutesDetail implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private accProfileService: AccountProfileService, private getExtraData: GetExtraDataService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     */
    resolve(route: ActivatedRouteSnapshot) {
        return this.accProfileService.getFavRoutesDetail(route.params['id']);
    }
}

@Injectable({
    providedIn: 'root'
})
export class GetEmergencyContact implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private accProfileService: AccountProfileService, private getExtraData: GetExtraDataService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     */
    resolve() {
        const userCookie = this.getExtraData.getUserFromCookie()
        let param = { encrypt_id: userCookie.encrypt_id }
        return this.accProfileService.getEmergencyContact(param);
    }
}

