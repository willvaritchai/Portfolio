import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ReportService } from './report.service';
import { CookieService } from 'ngx-cookie-service';
declare var window: any

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


