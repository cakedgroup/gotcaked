import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Rating, Recipe } from 'src/app/models/recipe.model';
import { Tag } from 'src/app/models/tag.model';
import { User, UserRegister } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { RecipeCreate } from '../../models/recipe.model';
import { AuthService } from './auth.service';
import { RecipeComment } from '../../models/comment.model';


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

  createUser(user: UserRegister): Observable<User> {
    return this.http.post<any>(`${this.baseUrl}/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/users/${user.id}`, user);
  }

  getLikedRecipesFromUser(userID: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/users/${userID}/liked/`);
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

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categories`, category, { headers: this.authService.createAuthorizationHeader() });
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/categories/${category.name}`, category, { headers: this.authService.createAuthorizationHeader() });
  }

  deleteCategory(category: string): Observable<Category> {
    return this.http.delete<Category>(`${this.baseUrl}/categories/${category}`, { headers: this.authService.createAuthorizationHeader() });
  }

  //
  // Tag Services
  //
  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.baseUrl}/tags`);
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${this.baseUrl}/tags`, tag, { headers: this.authService.createAuthorizationHeader() });
  }

  deleteTag(tag: string): Observable<Tag> {
    return this.http.delete<Tag>(`${this.baseUrl}/tags/${tag}`, { headers: this.authService.createAuthorizationHeader() });
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

  getRecipesByTag(tagId: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/tags/${tagId}/recipes`);
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/recipes/${id}`);
  }

  createRecipe(recipe: RecipeCreate): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}/recipes`, recipe, { headers: this.authService.createAuthorizationHeader() });
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.patch<Recipe>(`${this.baseUrl}/recipes/${recipe.id}`, recipe, { headers: this.authService.createAuthorizationHeader() });
  }

  deleteRecipe(id: string): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.baseUrl}/recipes/${id}`, { headers: this.authService.createAuthorizationHeader() });
  }

  getCommentsByRecipe(recipeID: string): Observable<RecipeComment[]> {
    return this.http.get<RecipeComment[]>(`${this.baseUrl}/recipes/${recipeID}/comments`);
  }

  createComment(recipeID: string, commentText: string): Observable<RecipeComment> {
    return this.http.post<RecipeComment>(`${this.baseUrl}/recipes/${recipeID}/comments`, { "text": commentText }, { headers: this.authService.createAuthorizationHeader() });
  }

  getRecipeRating(recipeID: string): Observable<Rating> {
    return this.http.get<Rating>(`${this.baseUrl}/recipes/${recipeID}/rating`);
  }

  upVoteRecipe(recipeID: string): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}/recipes/${recipeID}/rating`, { "vote": 1 }, { headers: this.authService.createAuthorizationHeader() });
  }

  downVoteRecipe(recipeID: string): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}/recipes/${recipeID}/rating`, { "vote": -1 }, { headers: this.authService.createAuthorizationHeader() });
  }

  //
  // Picture "Services"
  //
  uploadRecipePicture(recipeID: string, file: File): Observable<Recipe> {
    const formData = new FormData();
    formData.append('picture', file);
    return this.http.patch<Recipe>(`${this.baseUrl}/recipes/${recipeID}/picture`, formData, { headers: this.authService.createAuthorizationHeaderForm() });
  }

  uploadUserPicture(userID: string, file: File): Observable<User> {
    const formData = new FormData();
    formData.append('picture', file);
    return this.http.patch<User>(`${this.baseUrl}/users/${userID}/picture`, formData, { headers: this.authService.createAuthorizationHeaderForm() });
  }

  deleteUserPicture(userID: string): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/users/${userID}/picture`, { headers: this.authService.createAuthorizationHeader() });
  }

  deleteRecipePicture(recipeID: string, pictureURI: string): Observable<Recipe> {
    let pictureDeleteBody = { picture_uri: pictureURI };
    return this.http.delete<Recipe>(`${this.baseUrl}/recipes/${recipeID}/picture`, { headers: this.authService.createAuthorizationHeader(), body: pictureDeleteBody });
  }

}
