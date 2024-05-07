import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment-variables/environment';
import { urlService } from 'src/environment-variables/url.service';
@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  //***********
  // ตัวต้นแบบทั้งหมด
  //***********
  // url = 'api/v1/events';
  constructor(private http: HttpClient) { }
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);


  private _pasEventList: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _pasEventDetail: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _threadList: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _threadOwner: BehaviorSubject<any | null> = new BehaviorSubject(null);
  // private _eventById: BehaviorSubject<any | null> = new BehaviorSubject(null);
  // private _vehicleList: BehaviorSubject<any | null> = new BehaviorSubject(null);

  get pagination(): Observable<any> {
    return this._pagination.asObservable();
  }

  get pasEventListData(): Observable<any[]> {
    return this._pasEventList.asObservable();
  }

  get pasEventDetailData(): Observable<any[]> {
    return this._pasEventDetail.asObservable();
  }

  // สำหรับ driver --------------------------
  get threadListData(): Observable<any[]> {
    return this._threadList.asObservable();
  }
  get threadOwnerData(): Observable<any[]> {
    return this._threadOwner.asObservable();
  }


  // get eventByIdData(): Observable<any[]> {
  //   return this._eventById.asObservable();
  // }
  // get vehicleListData(): Observable<any[]> {
  //   return this._vehicleList.asObservable();
  // }

  // getAllEvent(): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/${this.url}/get`).pipe(
  //     tap((response) => {
  //       console.log('res-users(test): ', response);
  //       this._pasEventList.next(response)

  //     })
  //   );
  // }

  // getById(id: any, param: any): Observable<any> {

  //   return this.http
  //     .get(`${environment.apiUrl}/${this.url}/get/${id}`, {
  //       headers: new HttpHeaders().set('Content-Type', 'application/json'),
  //       params: param
  //     }
  //     ).pipe(
  //       tap((response) => {
  //         this._eventById.next(response);
  //       })
  //     );

  // }

  // joinEvent(data: any): Observable<any> {
  //   return this.http
  //     .post(`${environment.apiUrl}/${this.url}/joinEvent`, data)
  //     .pipe(
  //       tap((response) => {
  //         this._eventById.next(response);
  //       })
  //     );
  // }

  // deleteEvent(id: any) {
  //   return this.http.delete(`${environment.apiUrl}/${this.url}/delete/${id}`)
  // }


  // update(id: any, data: any) {
  //   return this.http.put(
  //     `${environment.apiUrl}/${this.url}/edit/${id}`,
  //     data
  //   );
  // }

  // getVehicle(id: any) {
  //   return this.http.get(`${environment.apiUrl}/${this.url}/getVehicle/${id}`)
  //     .pipe(
  //       tap((response) => {
  //         this._vehicleList.next(response);
  //       })
  //     );
  // }

  // สำหรับ passenger------------------------------------------------
  // 🤵🚕 getPassengerEvent
  getPassengerEvent(userId: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.threadUrl}/getPassengerEvent/${userId}`
    ).pipe(
      tap((response) => {
        console.log('pas-event: ', response);
        this._pasEventList.next(response)
      })
    );
  }

  // 🤵ℹ️ pasEventDetail
  pasEventDetail(thread_id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.threadUrl}/pasEventDetail/${thread_id}`
    ).pipe(
      tap((response) => {
        this._pasEventDetail.next(response)
      })
    );
  }

  // ✅🚕 checkForAcceptThread
  checkForAcceptThread(param: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.threadUrl}/checkForAcceptThread`,
      { params: param }
    )
  }

  createThread(data: any) {
    return this.http.post(
      `${environment.apiUrl}/${urlService.threadUrl}/createThread`,
      data
    );
  }

  // deleteThread
  deleteThread(id: any) {
    return this.http.delete(`${environment.apiUrl}/${urlService.threadUrl}/delete/${id}`)
  }


  // สำหรับ driver------------------------------------------------
  getAllThreads(param: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.threadUrl}/getAllThreads`, {
      params: param
    }
    ).pipe(
      tap((response) => {
        this._threadList.next(response)
      })
    );
  }

  getThreadOwner(param: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.threadUrl}/getThreadOwner`, {
      params: param
    }
    ).pipe(
      tap((response) => {
        this._threadOwner.next(response)
      })
    );
  }


}
