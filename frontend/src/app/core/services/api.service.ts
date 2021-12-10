import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { Category } from 'src/app/models/category.model';
import { Recipe } from 'src/app/models/recipe.model';
import { Tag } from 'src/app/models/tag.model';
import { User, UserRegister } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { RecipeCreate } from '../../models/recipe.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl = environment.backend;

  private categories = new BehaviorSubject<Category[]>(null);

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getStatus(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/status`);
  }

  //
  // User Services
  //
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  createUser(user: UserRegister): Observable<HttpResponse<User>> {
    return this.http.post<any>(`${this.baseUrl}/users`, user, { observe: 'response' });
  }

  updateUser(user: User): Observable<HttpResponse<User>> {
    return this.http.patch<User>(`${this.baseUrl}/users/${user.id}`, user, { observe: 'response' });
  }

  //
  // Category Services
  //
  updateCategories(categories: Category[]) {
    this.categories.next(categories);
  }

  getCategories(): Observable<Category[]> {
    this.http.get<Category[]>(`${this.baseUrl}/categories`).subscribe(categories => this.categories.next(categories));
    return this.categories.asObservable();
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

  //
  // Tag Services
  //
  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.baseUrl}/tags`);
  }

  createTag(tag: Tag): Observable<HttpResponse<Tag>> {
    return this.http.post<Tag>(`${this.baseUrl}/tags`, tag, { observe: 'response', headers: this.authService.createAuthorizationHeader() });
  }

  deleteTag(tag: string): Observable<HttpResponse<Tag>> {
    return this.http.delete<Tag>(`${this.baseUrl}/tags/${tag}`, { observe: 'response', headers: this.authService.createAuthorizationHeader() });
  }

  //
  // Recipe Services
  //
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipes`);
  }

  getRecipesByCategory(categoryId: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/categories/${categoryId}/recipes`);
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/recipes/${id}`);
  }

  createRecipe(recipe: RecipeCreate): Observable<HttpResponse<Recipe>> {
    return this.http.post<Recipe>(`${this.baseUrl}/recipes`, recipe, { observe: 'response', headers: this.authService.createAuthorizationHeader() });
  }

  updateRecipe(recipe: Recipe): Observable<HttpResponse<Recipe>> {
    return this.http.patch<Recipe>(`${this.baseUrl}/recipes/${recipe.id}`, recipe, { observe: 'response', headers: this.authService.createAuthorizationHeader() });
  }

  deleteRecipe(id: string): Observable<HttpResponse<Recipe>> {
    return this.http.delete<Recipe>(`${this.baseUrl}/recipes/${id}`, { observe: 'response', headers: this.authService.createAuthorizationHeader() });
  }

  //
  // Picture "Services"
  //
  uploadRecipePicture(recipeID: string, file: File): Observable<HttpResponse<Recipe>> {
    const formData = new FormData();
    formData.append('picture', file);
    return this.http.patch<Recipe>(`${this.baseUrl}/recipes/${recipeID}/picture`, formData, { observe: 'response', headers: this.authService.createAuthorizationHeaderForm() });
  }

  uploadUserPicture(userID: string, file: File): Observable<HttpResponse<User>> {
    const formData = new FormData();
    formData.append('picture', file);
    return this.http.patch<User>(`${this.baseUrl}/users/${userID}/picture`, formData, { observe: 'response', headers: this.authService.createAuthorizationHeaderForm() });
  }

  deleteUserPicture(userID: string): Observable<HttpResponse<User>> {
    return this.http.delete<User>(`${this.baseUrl}/users/${userID}/picture`, { observe: 'response', headers: this.authService.createAuthorizationHeader() });
  }

  deleteRecipePicture(recipeID: string, pictureURI: string): Observable<HttpResponse<Recipe>> {
    let pictureDeleteBody = { picture_uri: pictureURI };
    return this.http.delete<Recipe>(`${this.baseUrl}/recipes/${recipeID}/picture`, { observe: 'response', headers: this.authService.createAuthorizationHeader(), body: pictureDeleteBody });
  }

}
