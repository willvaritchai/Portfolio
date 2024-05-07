import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment-variables/environment';
import { urlService } from 'src/environment-variables/url.service';
@Injectable({
  providedIn: 'root',
})
export class SocialNetworkService {
  constructor(private http: HttpClient) { }
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _friendSuggestSearchList: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _friendList: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _friendRequest: BehaviorSubject<any | null> = new BehaviorSubject(null);

  get pagination(): Observable<any> {
    return this._pagination.asObservable();
  }

  get friendSuggestSearchData(): Observable<any[]> {
    return this._friendSuggestSearchList.asObservable();
  }

  get friendListData(): Observable<any[]> {
    return this._friendList.asObservable();
  }

  get friendRequestListData(): Observable<any[]> {
    return this._friendRequest.asObservable();
  }


  getFriendListSuggestSearch(param: any = { faculty_name: '', branch_name: '', user_id: '' }): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.socialNetworkUrl}/suggestionSearch`,
      {
        params: param,
      }
    ).pipe(
      tap((response) => {
        // console.log('res-friend-list: ',response);
        this._friendSuggestSearchList.next(response)
      })
    );
  }

  getFriendList(param: any = { faculty_name: '', branch_name: '', user_id: '' }): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.socialNetworkUrl}/list`,
      {
        params: param,
      }
    ).pipe(
      tap((response) => {
        // console.log('res-friend-list: ',response);
        this._friendList.next(response)
      })
    );
  }

  getFriendRequest(param: any = { faculty_name: '', branch_name: '', user_id: '' }): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.socialNetworkUrl}/request`,
      {
        params: param,
      }
    ).pipe(
      tap((response) => {
        // console.log('res-friend-list: ',response);
        this._friendRequest.next(response)
      })
    );
  }

  addUpdateFriendship(data: any) {
    return this.http.post(
      `${environment.apiUrl}/${urlService.socialNetworkUrl}/insertUpdateFriendship`,
      data
    );
  }

  cancelFriend(data: any) {
    return this.http.delete(`${environment.apiUrl}/${urlService.socialNetworkUrl}/cancelFriend`, { body: data })
  }

  deleteFriend(data: any) {
    return this.http.delete(`${environment.apiUrl}/${urlService.socialNetworkUrl}/deleteFriend`, { body: data })
  }

  // update(id, data) {
  //     return this.http.put(
  //         `${environment.apiUrl}/${this.serviceUrl}/put/${id}`,
  //         data
  //     );
  // }

  // saveConsent(data){
  //     return this.http.post(
  //         `${environment.apiUrl}/${this.consentUrl}/saveConsent`, data
  //     );
  // }

}
