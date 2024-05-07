import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment-variables/environment';
import { urlService } from 'src/environment-variables/url.service';
@Injectable({
  providedIn: 'root',
})
export class SudoSignInService {
  //***********
  // ตัวต้นแบบทั้งหมด
  //***********
  constructor(private http: HttpClient) {}
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);


  private _userList : BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _userDetail : BehaviorSubject<any | null> = new BehaviorSubject(null);

  get pagination(): Observable<any> {
    return this._pagination.asObservable();
  }

  get rolesListData(): Observable<any[]> {
    return this._userList.asObservable();
  }

  get userDetailData(): Observable<any[]> {
    return this._userDetail.asObservable();
  }

  
  getAllUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.userUrl}/getAll`).pipe(
      tap((response) => {
        console.log('res-user(test): ',response);
        this._userList.next(response)
      })
    );
  }

  getUserById(userId:number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.userUrl}/get/${userId}`).pipe(
      tap((response) => {
        // console.log('res-user: ',response);
        this._userDetail.next(response)
      })
    );
  }

  // getAllUser(): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/${urlService.eventUrl}/getAll`).pipe(
  //     tap((response) => {
  //       console.log('res-roles(test): ',response);
  //       this._userList.next(response)
        
  //       //   this._paginationReceiveDt.next(response.paginate);
  //       //   this._receive_dt.next(response.data);
  //     })
  //   );
  // }

  // delete(id) {
  //     return this.http.delete(`${environment.apiUrl}/${this.serviceUrl}/delete/${id}`)
  // }

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
