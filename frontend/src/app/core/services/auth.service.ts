import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JWT, JWTContent, User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = environment.backend;
  private jwtToken = new BehaviorSubject<String>(null);
  private userInformation = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private apiService: ApiService) {
  }

  //Creating Headers
  createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'jwt': this.jwtToken.value as string
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
    this.setUser();
  }

  //BehaviorSubject to get and set User-Infos
  getUser(): BehaviorSubject<User> {
    return this.userInformation;
  }

  setUser(): void {
    //Get User-ID from JWTToken
    let decodedJwtData = this.parseJWT();

    if (decodedJwtData !== null) {
      //Getting User-Information from Backend
      this.apiService.getUser(decodedJwtData.id).subscribe(user => {
        if (user !== null) {
          //Setting Fresh User-Information to BehaviorSubject
          this.userInformation.next(user);
        }
      });
    } else {
      //Setting User-Information to null
      this.userInformation.next(null);
    }
  }

  //AutoLogin User if JWT Token exists in localStorage
  autoLogin() {
    let token = localStorage.getItem('token');
    if (token !== null && token !== undefined && token !== "" && token !== "null") {
      this.jwtToken.next(token);
      this.setUser();
    }
  }

  //Backend-API Calls
  //Login User to get JWT Token
  userLogin(user: UserLogin): Observable<HttpResponse<JWT>> {
    return this.http.post<JWT>(this.baseUrl + '/auth/login', user, { observe: 'response' });
  }

  //Logout User to delete JWT Token
  userLogout(): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.baseUrl + '/auth/logout', null, { headers: this.createAuthorizationHeader(), observe: 'response' });
  }

  //Function to get JWTContent from JWTToken
  private parseJWT(): JWTContent {
    if (this.jwtToken.value === null) {
      return null;
    } else {
      let jwt = this.jwtToken.value as string;
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData: JWTContent = JSON.parse(decodedJwtJsonData);
      return decodedJwtData;
    }
  }
}
