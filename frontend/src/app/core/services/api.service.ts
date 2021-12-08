import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Recipe } from 'src/app/models/recipe.model';
import { User, UserRegister } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';


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

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  createUser(user: UserRegister): Observable<HttpResponse<User>> {
    return this.http.post<any>(`${this.baseUrl}/users`, user, { observe: 'response' });
  }

  updateUser(user: User): Observable<HttpResponse<User>> {
    return this.http.put<User>(`${this.baseUrl}/users/${user.id}`, user, { observe: 'response' });
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipes`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getRecipesByCategory(categoryId: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/categories/${categoryId}/recipes`);
  }

}
