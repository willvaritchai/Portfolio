import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment-variables/environment';
import { urlService } from 'src/environment-variables/url.service';
@Injectable({
  providedIn: 'root',
})
export class DriverRegisterService {
  constructor(private http: HttpClient) { }
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);


  private _eventList: BehaviorSubject<any | null> = new BehaviorSubject(null);
  // private _driverProfile: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _vehicleList: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _driverProfile: BehaviorSubject<any | null> = new BehaviorSubject(null);

  get pagination(): Observable<any> {
    return this._pagination.asObservable();
  }

  get eventListData(): Observable<any[]> {
    return this._eventList.asObservable();
  }
  get driverProfileData(): Observable<any[]> {
    return this._driverProfile.asObservable();
  }
  get vehicleListData(): Observable<any[]> {
    return this._vehicleList.asObservable();
  }



  // getAllEvent(): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/${this.url}/get`).pipe(
  //     tap((response) => {
  //       console.log('res-users(test): ',response);
  //       this._eventList.next(response)

  //     })
  //   );
  // }
  getDriverProfile(userId: any): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/${urlService.driverRegisterUrl}/getDriverProfile/${userId}`
      )
    .pipe(
      tap((response) => {
        this._driverProfile.next(response);
      })
    );
  }

  // 🪪 createVehicle
  uploadLicense(data: any) {
    return this.http.post(
      `${environment.apiUrl}/${urlService.driverRegisterUrl}/uploadLicense`,
      data
    );
  }

  // 🚕 createVehicle
  uploadVehicle(data: any) {
    return this.http.post(
      `${environment.apiUrl}/${urlService.driverRegisterUrl}/uploadVehicle`,
      data
    );
  }

  deleteVehicle(data: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data, // Include data in the request body
    };
    return this.http.delete(`${environment.apiFiles}/deleteVehicle`, options)
  }

  // update(id: any, data: any) {
  //   return this.http.put(
  //     `${environment.apiUrl}/${this.url}/edit/${id}`,
  //     data
  //   );
  // }



}
