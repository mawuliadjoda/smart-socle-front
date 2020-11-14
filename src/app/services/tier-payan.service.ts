import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './config/env.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TierPayanService {

  private baseUrl = this.env.baseUrl + '/smart/' + 'tierPayants';
  constructor(private http: HttpClient, private env: EnvService) {
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  add(t: any): Observable<any> {
    return this.http.post(this.baseUrl, t);
  }

  update(t: any): Observable<any> {
    return this.http.put(this.baseUrl, t);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/` + id);
  }

}
