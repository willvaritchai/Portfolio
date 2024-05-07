import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment-variables/environment';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;
  eventurl = "api/v1/events";
  // private url = 'http://localhost:3000'; // your server local path
  // private url = 'http://10.4.85.49:3000'; // vpn
  private url = 'https://capstone23.sit.kmutt.ac.th'; // prod path



  constructor(private http: HttpClient) {
    console.log(this.url);
    //this.socket = io(this.url, { transports: ['websocket', 'polling', 'flashsocket'] }); //local
    this.socket = io(this.url, { path: '/un2-socket/', transports: ['websocket', 'polling', 'flashsocket'], secure: true }); //prod
  }

  get requestListData(): Observable<any[]> {
    return this._requestList.asObservable();
  }
  get roomMemberListData(): Observable<any[]> {
    return this._RoomMemberList.asObservable();
  }

  private _RoomList: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _RoomMemberList: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _requestList: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _detailedList: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _eventDriver: BehaviorSubject<any | null> = new BehaviorSubject(null);


  joinRoom(data: any): void {
    this.socket.emit('join', data);
  }

  sendMessage(data: any): void {
    this.socket.emit('message', data);
    console.log('send data: ', data);
  }
  downloadFile(data: any): void {
    this.socket.emit('download', data);
    console.log('send data: ', data);
  }

  requestFileUrl(event: any): void {
    console.log('fileUrlRequest', { url: this.url, event: event });
    this.socket.emit('fileUrlRequest', { url: this.url, event: event });

    console.log('fileUrlResponse', event);
    this.socket.on('fileUrlResponse', (data: any) => {
      console.log('data0', data)
      const fileUrl = data.url;
      console.log('Received File URL:', fileUrl);

      // Now you can use 'fileUrl' for your specific needs
      // For example, trigger a download or display the file
    });
  }


  getMessage(): Observable<any> {
    return new Observable<{ user_id: number, user: string, event: number, event_name: String, message: string, timestamp: string }>(observer => {
      this.socket.on('new message', (data) => {
        console.log('received data: ', data);
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }

  getStorage() {
    const storage: string | null = localStorage.getItem('chats');
    return storage ? JSON.parse(storage) : [];
  }

  setStorage(data: any) {
    localStorage.setItem('chats', JSON.stringify(data));
  }


  getChatRoom(id: any) {
    return this.http.get(`${environment.apiUrl}/${this.eventurl}/getChatRoom/${id}`).pipe(
      tap((response) => {
        console.log('res-users(test): ', response);
        this._RoomList.next(response)
      })
    );
  }

  getChatRoomMember(id: any, param: any) {
    return this.http.get(`${environment.apiUrl}/${this.eventurl}/getChatRoomMember/${id}`, {
      params: param
    }).pipe(
      tap((response) => {
        console.log('res-users(test): ', response);
        this._RoomMemberList.next(response)
      })
    );
  }
  getRequest(param: any) {
    return this.http
      .get(`${environment.apiUrl}/${this.eventurl}/getRequest`, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        params: param
      }
      ).pipe(
        tap((response) => {
          this._requestList.next(response);
        })
      );
  }
  updateReqest(id: any, data: any) {
    return this.http.put(
      `${environment.apiUrl}/${this.eventurl}/responseRequest/${id}`,
      data
    );
  }
  cancelReqest(id: any) {
    console.log('id ser', id);
    return this.http.delete(`${environment.apiUrl}/${this.eventurl}/cancelRequest/${id}`)
  }
  getDeniedDetail(params: any) {
    return this.http.get(`${environment.apiUrl}/${this.eventurl}/getDeniedDetail`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: params
    }
    ).pipe(
      tap((response) => {
        this._detailedList.next(response);
      })
    );
  }
  getEventDriver(params: any) {
    return this.http.get(`${environment.apiUrl}/${this.eventurl}/getEventDriver`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: params
    }
    ).pipe(
      tap((response) => {
        this._eventDriver.next(response);
      })
    );
  }
  ratingDriver(params: any) {
    return this.http.post(`${environment.apiUrl}/${this.eventurl}/ratingDriver`, params)
  }
  changeEventStatus(eventId: any, status: any) {
    return this.http.put(`${environment.apiUrl}/${this.eventurl}/updateStatus/${eventId}`, status)
  }
}