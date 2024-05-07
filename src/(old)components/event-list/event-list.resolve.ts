import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { eventListService } from './event-list.service';
import { CookieService } from 'ngx-cookie-service';
import { NgOptimizedImage } from '@angular/common';

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
    constructor(private eventListService: eventListService,private cookieService: CookieService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    // if(this.cookieService.get('user') != '') {
    //     this.cookie = JSON.parse(this.cookieService.get('user'));
    //     this.userId = this.cookie.user_id;
    param = {user_id:JSON.parse(this.cookieService.get('user')).user_id};

    resolve() {
        return this.eventListService.getAllEvent(this.param);
    }
}

