import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateEchoInput, Echo } from '../../models/echo.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl = environment.backend;

  constructor(private http: HttpClient) {
  }

  getStatus(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/status`);
  }

  createEcho(echo: CreateEchoInput): Observable<Echo> {
    return this.http.post<Echo>(
      `${this.baseUrl}/echo`,
      echo
    ).pipe(
      catchError((err) => {
        console.log('In Service:', err);
        return throwError(err);
      })
    );
  }

  doError(): Observable<Echo> {
    return this.http.post<Echo>(
      `${this.baseUrl}/echo`,
      {}
    ).pipe(
      catchError((err) => {
        console.log('In Service:', err);
        return throwError(err);
      })
    );
  }

  getEchos(contains?: string): Observable<Echo[]> {
    return this.http.get<Echo[]>(
      `${this.baseUrl}/echo`,
      {
        params: contains ? {
          contains
        } : undefined
      }
    );
  }
}
