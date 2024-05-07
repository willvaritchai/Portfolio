import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment-variables/environment';
import { urlService } from 'src/environment-variables/url.service';
@Injectable({
  providedIn: 'root',
})
export class AlreadyHasAccService {
  //***********
  // ตัวต้นแบบทั้งหมด
  //***********
  constructor(private http: HttpClient) { }

  adminSignin(data: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.adminUrl}/adminLogin`,
    {
      params: data,
    }
    )
  }

  getUserByEmail(email: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.userUrl}/getByEmail`,
    {
      params: email,
    }
    )
  }

  userAuthentication(data: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.userUrl}/userAuthentication`,
    {
      params: data,
    }
    )
  }
}
