import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {Registration} from './models/registration';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@Injectable()
export class CommonService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


  // saveRegistration(register) {
  //
  //   const map = this.http.post('http://localhost:8080/api/SaveRegistration/', register)
  //     .map((response: Response) => response.json());
  //   return map;
  // }

  saveRegistration(register: Registration): Observable<any> {

    return this.http
      .post<any>('http://localhost:8080/api/SaveRegistration/', register, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getRegistration() {

    // return this.http
    //   .get<any>('http://localhost:8080/api/getUser/', this.httpOptions)
    //   .pipe(
    //     retry(2),
    //     catchError(this.handleError)
    //   );
    return this.http
      .get<any>('http://localhost:8080/api/getRegistration/', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deleteExistingRegistration(id: string) {

    const idVal = {'id': id};
    const  httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: idVal
    };

    return this.http
      .delete<any>('http://localhost:8080/api/deleteRegistration/', httpOptions1)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateRegistration(register: any): Observable<any> {
    const bodyobj = {body: register};

    return this.http
      .put<any>('http://localhost:8080/api/updateRegistration/', bodyobj, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
