import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment-variables/environment';
import { urlService } from 'src/environment-variables/url.service';
@Injectable({
  providedIn: 'root',
})
export class SudoAlreadyHasAccService {
  //***********
  // ตัวต้นแบบทั้งหมด
  //***********
  constructor(private http: HttpClient) { }

  getUserByEmail(email: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${urlService.userUrl}/getByEmail`,
    {
      params: email,
    }
    )
  }
}