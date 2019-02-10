import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private user: Array<any>;
  public site: string;
  constructor(private http: Http) {
  }

  login(email: string, password: any): Observable<any> {
    this.site = "https://localhost:44379/api/SampleData/Login?email=" + email + "&password=" + password;

    const headerDict = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    }

    return this.http.get(this.site, requestOptions);
  }

  signup(email: string, userName: string, password: any): Observable<any> {
    this.site = "https://localhost:44379/api/SampleData/Signup?email=" + email + "&username=" + userName + "&password=" + password;
    const data = {
      'email': email,
      'userName': userName,
      'password': password
    };

    const headerDict = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    }

    return this.http.post(this.site, requestOptions);
  }

  getCurrentUser(): Observable<any> {

    this.site = "https://localhost:44379/api/User/GetCurrentUser";

    const headerDict = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    }

    return this.http.get(this.site, requestOptions);

  }

  logout(): Observable<any> {

    this.site = "https://localhost:44379/api/User/Logout";

    const headerDict = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    }

    return this.http.get(this.site, requestOptions);

  }

  getUserList(): Observable<any> {

    this.site = "https://localhost:44379/api/User/GetUserList";

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
