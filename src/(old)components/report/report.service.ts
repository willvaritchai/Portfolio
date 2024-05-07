import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment-variables/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  //***********
  // ตัวต้นแบบทั้งหมด
  //***********
  url = 'api/v1/users';
  constructor(private http: HttpClient) {}
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);


  private _userList : BehaviorSubject<any | null> = new BehaviorSubject(null);

  get pagination(): Observable<any> {
    return this._pagination.asObservable();
  }

  get userData(): Observable<any[]> {
    return this._userList.asObservable();
  }

  

  //******************
  // CRUD - ตัวอย่าง
  //******************
  getUserInfo(param:any): Observable<any> {
    return this.http
        .get(`${environment.apiUrl}/${this.url}/getReportUser`,{
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
          params: param
        }
        ).pipe(
            tap((response) => {
                this._userList.next(response);
            })
        );
}
reprotUser(data:any) {
  return this.http.post(
      `${environment.apiUrl}/${this.url}/reportUser`,
      data
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
