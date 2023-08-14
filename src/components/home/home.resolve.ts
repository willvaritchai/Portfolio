import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { HomeService } from './home.service';

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
    }
}

@Injectable({
    providedIn: 'root'
})
export class GetAllUserTestResolver implements Resolve<any>
{
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

