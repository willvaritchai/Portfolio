// file.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  // private pathurl = 'http://localhost:3000'; // your server local path
  private pathurl = 'https://capstone23.sit.kmutt.ac.th/un2/chat-server'; // your server prod path
  //private pathurl = 'http://10.4.85.49:3000'; // prod path

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  // downloadFile(eventName: string): Observable<Blob> {
  //   downloadFile(eventName: string): Observable<any> {
  //   const url = `${this.url}/download`;
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   });

  //   return this.http.post(url, { event: eventName }, {
  //     headers,
  //     responseType: 'blob' as 'json', // Specify the response type as 'blob'
  //   });
  // }

  // getDownloadLink(eventName: string): Observable<SafeUrl> {
  //   return this.downloadFile(eventName).pipe(
  //     // Convert the Blob to a SafeUrl
  //     this.mapBlobToSafeUrl()
  //   );
  // }

  // private mapBlobToSafeUrl(): (source: Observable<Blob>) => Observable<SafeUrl> {
  //   return (source: Observable<Blob>) => {
  //     return new Observable<SafeUrl>((observer) => {
  //       source.subscribe(
  //         (blob: Blob) => {
  //           const url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  //           observer.next(url);
  //         },
  //         (error) => {
  //           observer.error(error);
  //         },
  //         () => {
  //           observer.complete();
  //         }
  //       );
  //     });
  //   };
  // }

  download(url: string):Observable<Blob> {
    console.log('blob download: ' + url);
    return this.http.get(`${this.pathurl}/${url}`, { responseType: 'blob' });
  }
}
