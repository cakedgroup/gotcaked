import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserRegister } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { Category } from '../../models/category.model';
import { AuthService } from './auth.service';
import { Tag } from 'src/app/models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl = environment.backend;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getStatus(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/status`);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  createUser(user: UserRegister): Observable<HttpResponse<User>> {
    return this.http.post<any>(`${this.baseUrl}/users`, user, { observe: 'response' });
  }

  updateUser(user: User): Observable<HttpResponse<User>> {
    return this.http.put<User>(`${this.baseUrl}/users/${user.id}`, user, { observe: 'response' });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  createCategory(category: Category): Observable<HttpResponse<Category>> {
    return this.http.post<Category>(`${this.baseUrl}/categories`, category, { observe: 'response', headers: this.authService.createAuthorizationHeader() });
  }

  updateCategory(category: Category): Observable<HttpResponse<Category>> {
    return this.http.put<Category>(`${this.baseUrl}/categories/${category.name}`, category, { observe: 'response', headers: this.authService.createAuthorizationHeader() });
  }

  deleteCategory(category: string): Observable<HttpResponse<Category>> {
    return this.http.delete<Category>(`${this.baseUrl}/categories/${category}`, { observe: 'response', headers: this.authService.createAuthorizationHeader() });
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.baseUrl}/tags`);
  }

  createTag(tag: Tag): Observable<HttpResponse<Tag>> {
    return this.http.post<Tag>(`${this.baseUrl}/tags`, tag, { observe: 'response', headers: this.authService.createAuthorizationHeader() });
  }

  deleteTag(tag: string): Observable<HttpResponse<Tag>> {
    return this.http.delete<Tag>(`${this.baseUrl}/tags/${tag}`, { observe: 'response', headers: this.authService.createAuthorizationHeader() });
  }

}
