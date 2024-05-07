import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environment-variables/environment';
import { urlService } from 'src/environment-variables/url.service';
@Injectable({
  providedIn: 'root',
})
export class AccountProfileService {
  //***********
  // ตัวต้นแบบทั้งหมด
  //***********
  constructor(private http: HttpClient) { }
  // private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);


  private _facultyList: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _branchList: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _otherProfile: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _favRouteList: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _favRouteById: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _contactData: BehaviorSubject<any | null> = new BehaviorSubject(null);
  // private _userData: BehaviorSubject<any | null> = new BehaviorSubject(null);

  // get pagination(): Observable<any> {
  //   return this._pagination.asObservable();
  // }

  get facultyListData(): Observable<any[]> {
    return this._facultyList.asObservable();
  }
  get branchListData(): Observable<any[]> {
    return this._branchList.asObservable();
  }

  get otherProfileData(): Observable<any[]> {
    return this._otherProfile.asObservable();
  }
  get favRouteListData(): Observable<any[]> {
    return this._favRouteList.asObservable();
  }
  get favRouteById(): Observable<any[]> {
    return this._favRouteById.asObservable();
  }

  get contactData(): Observable<any[]> {
    return this._contactData.asObservable();
  }

  getUserById(user_Id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.userUrl}/get/${user_Id}`)
    // .pipe(
    //   tap((response) => {
    //     this._userData.next(response)
    //   })
    // );
  }

  getFaculties(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.userUrl}/getFaculties`).pipe(
      tap((response) => {
        this._facultyList.next(response)
      })
    );
  }

  getBranches(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.userUrl}/getBranches`).pipe(
      tap((response) => {
        this._branchList.next(response)
      })
    );
  }

  // 🧑‍🤝‍🧑 getOtherProfile
  getOtherProfile(param: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.userUrl}/getOtherProfile`,
      {
        params: param
      }).pipe(
        tap((response) => {
          this._otherProfile.next(response)
        })
      );
  }

  createAccount(data: any) {
    return this.http.post(
      `${environment.apiUrl}/${urlService.userUrl}/sign-up`,
      data
    )
  }

  updateAccount(data: any) {
    return this.http.put(
      `${environment.apiUrl}/${urlService.userUrl}/update`,
      data
    );
  }

  getAllFavRoutes(enCryptUserId: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.favRouteUrl}/getAllFavRoutes/${enCryptUserId}`).pipe(
      tap((response) => {
        this._favRouteList.next(response)

        //   this._paginationReceiveDt.next(response.paginate);
        //   this._receive_dt.next(response.data);
      })
    );
  }

  getFavRoutesDetail(enCryptId: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.favRouteUrl}/getFavRoutesDetail/${enCryptId}`).pipe(
      tap((response) => {
        this._favRouteById.next(response)
      })
    );
  }

  createEditFavRoute(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${urlService.favRouteUrl}/createEdit`, data)
  }


  deleteFavRoute(id: any) {
    return this.http.delete(`${environment.apiUrl}/${urlService.favRouteUrl}/deleteFavRoute/${id}`)
  }

  // 📲EmergencyContact
  getEmergencyContact(param: { encrypt_id: any }): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.userUrl}/emergencyContact/get`,
      { params: param }
    ).pipe(
      tap((response) => {
        this._contactData.next(response)
      })
    );
  }

  createContact(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${urlService.userUrl}/emergencyContact/create`, data)
  }

  updateEmergencyContact(data: any) {
    return this.http.put(
      `${environment.apiUrl}/${urlService.userUrl}/emergencyContact/update`,
      data
    );
  }

  deleteEmergencyContact(enContactId: any) {
    return this.http.delete(`${environment.apiUrl}/${urlService.userUrl}/deleteEmergencyContact/${enContactId}`)
  }

}
