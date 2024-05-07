import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { SocialNetworkService } from './social-network.service';
import { CookieService } from 'ngx-cookie-service';
import { AccountProfileService } from '../account-profile/account-profile.service';
import { Subject, takeUntil } from 'rxjs';
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
export class FriendSuggestionListResolver implements Resolve<any>
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(private socialNetworkService: SocialNetworkService,
        private accountProfileService: AccountProfileService,
        private cookieService: CookieService,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    resolve() {
        if (localStorage.getItem('user-signup')) {
            const userFromStoreData:any = localStorage.getItem('user-signup')
            const userData = JSON.parse(userFromStoreData);
            let params = { faculty_name: userData.faculty_name, branch_name: userData.branch_name, user_id: userData.user_id, search_friend: false }

            return this.socialNetworkService.getFriendListSuggestSearch(params);
        }else{
            window.alertClose()
            this._router.navigate(['/home'])
        }
        return
    }
}

@Injectable({
    providedIn: 'root'
})
export class FriendSearchListResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private socialNetworkService: SocialNetworkService,
        private cookieService: CookieService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    resolve() {
        const userFromStoreData = this.cookieService.get('user');
        const userData = JSON.parse(userFromStoreData);
        console.log('user: ', userData);
        let params = { faculty_name: userData.faculty_name, branch_name: userData.branch_name, user_id: userData.user_id, search_friend: true }
        return this.socialNetworkService.getFriendListSuggestSearch(params);
    }
}

@Injectable({
    providedIn: 'root'
})
export class FriendListResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private socialNetworkService: SocialNetworkService,
        private cookieService: CookieService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    resolve() {
        const userFromStoreData = this.cookieService.get('user');
        const userData = JSON.parse(userFromStoreData);
        console.log('user: ', userData);
        let params = { faculty_name: userData.faculty_name, branch_name: userData.branch_name, user_id: userData.user_id }
        return this.socialNetworkService.getFriendList(params);
    }
}

@Injectable({
    providedIn: 'root'
})
export class FriendRequestResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private socialNetworkService: SocialNetworkService,
        private cookieService: CookieService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    resolve() {
        const userFromStoreData = this.cookieService.get('user');
        const userData = JSON.parse(userFromStoreData);
        console.log('user: ', userData);
        let params = { faculty_name: userData.faculty_name, branch_name: userData.branch_name, user_id: userData.user_id }
        return this.socialNetworkService.getFriendRequest(params);
    }
}


