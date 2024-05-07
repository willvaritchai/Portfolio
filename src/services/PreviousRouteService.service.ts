import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PreviousRouteService {
    //   private previousUrl: string | undefined = undefined;
    private currentUrl: string | undefined = undefined;
    private _previousUrl: BehaviorSubject<any | null> = new BehaviorSubject(null);

    get getPreviousUrl(): Observable<any[]> {
        return this._previousUrl.asObservable();
      }


    constructor(private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this._previousUrl.next(event.url)
                this.currentUrl = event.url;
                console.log(event.url);

            }
        });
    }

    // getPreviousUrl() {
    //     return this.previousUrl;
    // }
}
