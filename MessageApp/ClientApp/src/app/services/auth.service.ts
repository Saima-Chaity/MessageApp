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

  //signup(email: string, userName: string, password: any): Observable<any> {
  //  this.site = "https://localhost:44379/api/SampleData/Signup";
  //  const data = {
  //    'email': email,
  //    'userName': userName,
  //    'password': password
  //  };

  //  const headerDict = {
  //    "Content-Type": "application/json",
  //    "Accept": "application/json"
  //  }

  //  const requestOptions = {
  //    headers: new Headers(headerDict),
  //  }

  //  return this.http.post(this.site, data, requestOptions)
  //    .pipe(map(this.extractData),
  //      catchError(this.handleError.bind(this)))
  //}

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError(error: any) {
    throw (error);
  }

  //createItem(clientID, accountID, balance): Observable<any> {
  //  const data = {
  //    'clientID': clientID,
  //    'accountID': accountID,
  //    'balance': balance
  //  };
  //  return this.http.post(this.site, data);
  //}


  //signup(email: string, userName: string, password: string) {
  //  return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  //    .then((user) => {
  //      this.signupAttempt = 1;
  //      this.authState = user;
  //      const status = 'online';
  //      this.setUserData(email, userName, status);
  //      window.location.reload();
  //    });
}



//get(): Observable < string[] > {

//  this.site = "https://localhost:44311/api/SampleData/WeatherForecasts";
//  return this.http.get(this.site)
//    .pipe(map(this.extractData),
//      catchError(this.handleError.bind(this)))
//}

//getItem(userInput: number): Observable < string[] > {

//  const headerDict = {
//    "Content-Type": "application/json",
//    "Accept": "application/json"
//  }

//    const requestOptions = {
//    headers: new Headers(headerDict),
//  }

//    this.site = "https://localhost:44311/api/SampleData/GetById?id=" + userInput;
//  return this.http.get(this.site, requestOptions)
//    .pipe(map(this.extractData),
//      catchError(this.handleError.bind(this)))
//}

//  private extractData(res: Response) {
//  let body = res.json();
//  return body;
//}

//  private handleError(error: any) {
//  throw (error);
//}

