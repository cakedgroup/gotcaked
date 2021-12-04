import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { JWT, User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = environment.backend;
  private jwtToken = new BehaviorSubject<String>(null);
  private userInformation = new BehaviorSubject<User>(null);

  private testUser: User = {
    id: "1",
    name: "test",
    description: "test",
    email: "test",
    picture_uri: "test"
  };

  constructor(private http: HttpClient) {

  }

  //Creating Headers
  createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      '"token': this.jwtToken.value as string
    });
  }

  //BehaviorSubject to get JWTToken
  getJWTToken(): BehaviorSubject<String> {
    return this.jwtToken;
  }

  //Set JWTToken
  setJWTToken(token: String): void {
    this.jwtToken.next(token);
    localStorage.setItem('token', token as string);
  }

  //BehaviorSubject to get and set User-Infos
  getUser(): BehaviorSubject<User> {
    return this.userInformation;
  }

  setUser(user: User) {
    this.userInformation.next(user);
  }

  autoLogin() {
    let token = localStorage.getItem('token');
    if (token != null && token != undefined && token != '') {
      this.jwtToken.next(token);
      this.setUser(this.testUser);
    }
  }


  //Backend-API Calls
  //Login User to get JWT Token
  userLogin(user: UserLogin): Observable<HttpResponse<JWT>> {
    return this.http.post<JWT>(this.baseUrl + '/auth/login', user, { observe: 'response' });
  }

  //Logout User to delete JWT Token
  userLogout(): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/auth/logout', { headers: this.createAuthorizationHeader() });
  }



}
