import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { HomeService } from './about-us.service';
import { CookieService } from 'ngx-cookie-service';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';
declare var window: any

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
export class GetAllUserTestResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private homeService: HomeService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    resolve() {
        return this.homeService.getAllUsers();
    }
}

@Injectable({
    providedIn: 'root'
})
export class GetFavRoutesHomeResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private homeService: HomeService, private getExtraDataService: GetExtraDataService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    resolve() {
        let user = this.getExtraDataService.getUserFromCookie()
        if (user.role_id != 1) {
            return this.homeService.getFavRoutesHome(user.encrypt_id);
        }
        return
    }
}

