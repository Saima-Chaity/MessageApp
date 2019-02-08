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

    return this.http.get(this.site, requestOptions)
      .pipe(map(this.extractData),
        catchError(this.handleError.bind(this)))
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

    return this.http.post(this.site, requestOptions)
      .pipe(map(this.extractData),
        catchError(this.handleError.bind(this)))
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

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError(error: any) {
    throw (error);
  }

}
