import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService<T> {
  public baseUrl: string;
  constructor(private http: HttpClient, endPoint: string){
    this.baseUrl = environment.baseUrl + endPoint;
  }
  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  add(t: T): Observable<any> {
    return this.http.post(this.baseUrl, t);
  }

  update(t: T): Observable<any> {
    return this.http.put(this.baseUrl, t);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/` + id);
  }
}
