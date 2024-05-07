import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment-variables/environment';
import { urlService } from 'src/environment-variables/url.service';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  //***********
  // ตัวต้นแบบทั้งหมด
  //***********
  constructor(private http: HttpClient) { }
  // private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);


  private _facultyList: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _branchList: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _userData: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _userList: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _countAppStatList: BehaviorSubject<any | null> = new BehaviorSubject(null);

  // get pagination(): Observable<any> {
  //   return this._pagination.asObservable();
  // }

  get facultyListData(): Observable<any[]> {
    return this._facultyList.asObservable();
  }
  get branchListData(): Observable<any[]> {
    return this._branchList.asObservable();
  }
  get userData(): Observable<any[]> {
    return this._userData.asObservable();
  }

  get userListData(): Observable<any[]> {
    return this._userList.asObservable();
  }

  get appStatListData(): Observable<any[]> {
    return this._countAppStatList.asObservable();
  }

  getUserList(param: any = {}): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.adminUrl}/getAllUser`,
      { params: param }
    ).pipe(
      tap((response) => {
        console.log('user-list: ', response);
        this._userList.next(response)
      }, (e) => {
      })
    );
  }

  getCountApprovalStatus(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.adminUrl}/countApprovalStatus`
    ).pipe(
      tap((response) => {
        this._countAppStatList.next(response)
      })
    );
  }


  getUserDetail(user_Id: any, param: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.adminUrl}/getUser/${user_Id}`, {
      params: param
    }).pipe(
      tap((response) => {
        this._userData.next(response)
      })
    );
  }

  updateUser(data: any) {
    return this.http.put(
      `${environment.apiUrl}/${urlService.adminUrl}/updateUser`,
      data
    );
  }

  updateAdminApprovalStatus(data: any) {
    return this.http.put(
      `${environment.apiUrl}/${urlService.adminUrl}/adminApproval`,
      data
    );
  }

  deleteAccount(user_id: any) {
    return this.http.delete(`${environment.apiUrl}/${urlService.adminUrl}/deleteUser/${user_id}`)
  }

  // getFaculties(): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/${urlService.userUrl}/getFaculties`).pipe(
  //     tap((response) => {
  //       this._facultyList.next(response)
  //     })
  //   );
  // }
  // getBranches(): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/${urlService.userUrl}/getBranches`).pipe(
  //     tap((response) => {
  //       this._branchList.next(response)
  //     })
  //   );
  // }

  // createAccount(data: any) {
  //   return this.http.post(
  //     `${environment.apiUrl}/${urlService.userUrl}/sign-up`,
  //     data
  //   )
  // }

  // updateAccount(data: any) {
  //   return this.http.put(
  //     `${environment.apiUrl}/${urlService.userUrl}/update`,
  //     data
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
