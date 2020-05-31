import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Client } from '../models/client';
import { EnvService } from './config/env.service';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = this.env.baseUrl + '/smart/' + 'clients';
  constructor(private http: HttpClient, private env: EnvService) {

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
