import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Client } from '../model/client';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = environment.baseUrl + 'clients';
  constructor(private http: HttpClient) {

  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  add(t: Client): Observable<any> {
    return this.http.post(this.baseUrl, t);
  }

  update(t: Client): Observable<any> {
    return this.http.put(this.baseUrl, t);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/` + id);
  }
}
