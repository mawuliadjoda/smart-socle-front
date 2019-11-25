import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService<T> {
  public baseUrl: string;

  private http: HttpClient;
  public init(endPoint: string, http: HttpClient) {
    this.baseUrl = environment.baseUrl + endPoint;
    this.http = http;
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  add(issue: T): Observable<any> {
    return this.http.post(this.baseUrl, issue);
  }

  update(issue: T): Observable<any> {
    return this.http.put(this.baseUrl, issue);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id);
  }
}
