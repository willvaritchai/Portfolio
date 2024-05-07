import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment-variables/environment';
@Injectable({
  providedIn: 'root',
})
export class eventListService {
  //***********
  // ตัวต้นแบบทั้งหมด
  //***********
  url = 'api/v1/events';
  constructor(private http: HttpClient) { }
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);


  private _eventList: BehaviorSubject<any | null> = new BehaviorSubject(null);

  get pagination(): Observable<any> {
    return this._pagination.asObservable();
  }

  get eventListData(): Observable<any[]> {
    return this._eventList.asObservable();
  }



  //******************
  // CRUD - ตัวอย่าง
  //******************
  getAllEvent(param: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${this.url}/get`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: param
    }).pipe(
      tap((response) => {
        this._eventList.next(response)

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
