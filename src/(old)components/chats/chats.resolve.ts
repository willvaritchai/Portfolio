import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { HomeService } from './chats.service';
import { CookieService } from 'ngx-cookie-service';
import { ChatService } from './service/chats.service.component';
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
    }
}

@Injectable({
    providedIn: 'root'
})
export class GetRequestResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private chatService: ChatService, private cookieService: CookieService) {
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
        return this.chatService.getRequest(params);
    }
}
@Injectable({
    providedIn: 'root'
})
export class GetRoomChatResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private chatService: ChatService, private cookieService: CookieService, private _getExtraDataService: GetExtraDataService) {
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
        const id = route.params['id'];
        console.log('resolve: ', id);
        const userCookie = this._getExtraDataService.getUserFromCookie()
        const param = { encrypt_id: userCookie.encrypt_id }
        return this.chatService.getChatRoomMember(id, param);
    }
}

