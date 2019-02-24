import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ChatService {

  site: string;

  constructor(private http: Http) { }

  sendMessage(message: string): Observable<any> {
    this.site = "https://localhost:44379/api/Message/SendMessage?message=" + message;

    const headerDict = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    }

    const data = {
      'message': message
    };

    return this.http.post(this.site, requestOptions);
  }

  sendMessageAndFile(message: string, file: any): Observable<any> {
    this.site = "https://localhost:44379/api/Message/SendMessageAndFile?message=" + message;

    const headerDict = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    }

    const data = {
      'message': message,
      'file': file
    };

    console.log(JSON.stringify(data));

    return this.http.post(this.site, file, requestOptions);
  }

  sendFile(file: any): Observable<any> {
    this.site = "https://localhost:44379/api/Message/SendFile";

    const headerDict = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    }

    return this.http.post(this.site, file, requestOptions);
  }

  GetAllMessage(): Observable<any> {
    this.site = "https://localhost:44379/api/Message/GetMessages";

    const headerDict = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    }

    return this.http.get(this.site, requestOptions);
  }
}
