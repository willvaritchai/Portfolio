import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment-variables/environment';
import { urlService } from 'src/environment-variables/url.service';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  //***********
  // ตัวต้นแบบทั้งหมด
  //***********
  url = 'v1/apienpoint/consent';
  constructor(private http: HttpClient) { }
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);


  private _userList: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _favRouteList: BehaviorSubject<any | null> = new BehaviorSubject(null);

  get pagination(): Observable<any> {
    return this._pagination.asObservable();
  }

  get userListData(): Observable<any[]> {
    return this._userList.asObservable();
  }
  get favRouteListData(): Observable<any[]> {
    return this._favRouteList.asObservable();
  }



  //******************
  // CRUD - ตัวอย่าง
  //******************
  getAllUsers(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/users`).pipe(
      tap((response) => {
        console.log('res-users(test): ', response);
        this._userList.next(response)

        //   this._paginationReceiveDt.next(response.paginate);
        //   this._receive_dt.next(response.data);
      })
    );
  }

  getFavRoutesHome(enCryptUserId: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.favRouteUrl}/getFavRoutesHome/${enCryptUserId}`).pipe(
      tap((response) => {
        this._favRouteList.next(response)
      })
    );
  }

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
