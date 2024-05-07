import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment-variables/environment';
@Injectable({
  providedIn: 'root',
})
export class EventDetalService {
  //***********
  // ตัวต้นแบบทั้งหมด
  //***********
  url = 'api/v1/events';
  constructor(private http: HttpClient) { }
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);


  private _eventList: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _eventById: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _vehicleList: BehaviorSubject<any | null> = new BehaviorSubject(null);

  get pagination(): Observable<any> {
    return this._pagination.asObservable();
  }

  get eventListData(): Observable<any[]> {
    return this._eventList.asObservable();
  }
  get eventByIdData(): Observable<any[]> {
    return this._eventById.asObservable();
  }
  get vehicleListData(): Observable<any[]> {
    return this._vehicleList.asObservable();
  }



  getAllEvent(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${this.url}/get`).pipe(
      tap((response) => {
        console.log('res-users(test): ', response);
        this._eventList.next(response)

      })
    );
  }
  getById(id: any, param: any): Observable<any> {

    return this.http
      .get(`${environment.apiUrl}/${this.url}/get/${id}`, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        params: param
      }
      ).pipe(
        tap((response) => {
          this._eventById.next(response);
        })
      );

  }

  joinEvent(data: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/${this.url}/joinEvent`, data)
      .pipe(
        tap((response) => {
          this._eventById.next(response);
        })
      );
  }

  deleteEvent(id: any) {
    return this.http.delete(`${environment.apiUrl}/${this.url}/delete/${id}`)
  }


  // delete(id) {
  //     return this.http.delete(`${environment.apiUrl}/${this.serviceUrl}/delete/${id}`)
  // }

  update(id: any, data: any) {
    return this.http.put(
      `${environment.apiUrl}/${this.url}/edit/${id}`,
      data
    );
  }
  getVehicle(id: any) {
    return this.http.get(`${environment.apiUrl}/${this.url}/getVehicle/${id}`)
      .pipe(
        tap((response) => {
          this._vehicleList.next(response);
        })
      );
  }
  createEvent(data: any) {
    return this.http.post(
      `${environment.apiUrl}/${this.url}/post`,
      data
    );
  }

  // saveConsent(data){
  //     return this.http.post(
  //         `${environment.apiUrl}/${this.consentUrl}/saveConsent`, data
  //     );
  // }
}
